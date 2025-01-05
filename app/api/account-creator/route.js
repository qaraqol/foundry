import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createWaxAccount } from "@/utils/waxAccountCreator";

export async function POST(req) {
  try {
    const { accountName, ownerKey, activeKey, captchaToken } = await req.json();
    const headersList = headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0] : "unknown";

    // Verify hCaptcha
    const verificationUrl = "https://api.hcaptcha.com/siteverify";
    const verificationResponse = await fetch(verificationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET_KEY,
        response: captchaToken,
      }),
    });

    const verificationData = await verificationResponse.json();
    if (!verificationData.success) {
      return NextResponse.json(
        {
          errors: {
            captcha: "Captcha verification failed. Please try again.",
          },
        },
        { status: 400 }
      );
    }

    // Validate inputs
    const errors = {};
    if (!/^[a-z1-5]{12}$/.test(accountName)) {
      errors.accountName = "Invalid account name format.";
    }

    const keyRegex1 = /^PUB_K1_[1-9A-HJ-NP-Za-km-z]{50}$/;
    const keyRegex2 = /^EOS[1-9A-HJ-NP-Za-km-z]{50}$/;

    if (!keyRegex1.test(ownerKey) && !keyRegex2.test(ownerKey)) {
      errors.ownerKey = "Invalid owner public key.";
    }

    if (!keyRegex1.test(activeKey) && !keyRegex2.test(activeKey)) {
      errors.activeKey = "Invalid active public key.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Create the WAX account
    const result = await createWaxAccount(
      accountName,
      ownerKey,
      activeKey,
      ipAddress
    );

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Failed to create account",
          message: result.error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Account created successfully!",
      details: result,
    });
  } catch (error) {
    console.error("Account creation error:", error);
    return NextResponse.json(
      {
        error: "Failed to create account",
        message:
          error.message ||
          "An unexpected error occurred while creating your account.",
      },
      { status: 500 }
    );
  }
}
