import { Api, JsonRpc } from "eosjs";
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig";
import { TextDecoder, TextEncoder } from "util";
import { logTransaction } from "./db";

const rpc = new JsonRpc("https://wax.greymass.com");

async function verifyTransaction(transactionId) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(
      "https://wax.greymass.com/v1/history/get_transaction",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: transactionId }),
      }
    );

    if (!response.ok) throw new Error("Transaction verification failed");
    const data = await response.json();
    return data.trx.receipt.status === "executed";
  } catch (error) {
    console.error("Transaction verification error:", error);
    return false;
  }
}
async function checkKeyExists(publicKey) {
  try {
    const response = await fetch(
      "https://wax.greymass.com/v1/chain/get_accounts_by_authorizers",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keys: [publicKey],
        }),
      }
    );

    if (!response.ok) return false;
    const data = await response.json();
    return data.accounts.length > 0;
  } catch {
    return false;
  }
}
async function checkAccountExists(accountName) {
  try {
    const response = await fetch(
      "https://wax.greymass.com/v1/chain/get_account",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account_name: accountName }),
      }
    );
    return response.ok;
  } catch {
    return false;
  }
}

export async function createWaxAccount(
  accountName,
  ownerKey,
  activeKey,
  ipAddress
) {
  let transactionId = null;
  let retries = 0;
  const maxRetries = 1;

  try {
    if (await checkAccountExists(accountName)) {
      throw new Error("Account name is already taken");
    }
    const ownerKeyUsed = await checkKeyExists(ownerKey);
    if (ownerKeyUsed) {
      throw new Error("Owner public key is already in use");
    }

    const activeKeyUsed = await checkKeyExists(activeKey);
    if (activeKeyUsed) {
      throw new Error("Active public key is already in use");
    }

    const privateKey = process.env.CREATOR_PRIVATE_KEY;
    const creatorAccount = process.env.CREATOR_ACCOUNT;

    const balance = await rpc.get_currency_balance(
      "eosio.token",
      creatorAccount,
      "WAX"
    );
    if (
      !balance[0] ||
      parseFloat(balance[0]) <
        parseFloat(process.env.CPU_STAKE) +
          parseFloat(process.env.NET_STAKE) +
          2
    ) {
      throw new Error("Insufficient balance in creator account");
    }

    const signatureProvider = new JsSignatureProvider([privateKey]);
    const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    });

    const transaction = {
      actions: [
        {
          account: "eosio",
          name: "newaccount",
          authorization: [
            {
              actor: creatorAccount,
              permission: "active",
            },
          ],
          data: {
            creator: creatorAccount,
            name: accountName,
            owner: {
              threshold: 1,
              keys: [{ key: ownerKey, weight: 1 }],
              accounts: [],
              waits: [],
            },
            active: {
              threshold: 1,
              keys: [{ key: activeKey, weight: 1 }],
              accounts: [],
              waits: [],
            },
          },
        },
        {
          account: "eosio",
          name: "buyrambytes",
          authorization: [
            {
              actor: creatorAccount,
              permission: "active",
            },
          ],
          data: {
            payer: creatorAccount,
            receiver: accountName,
            bytes: 3000,
          },
        },
        {
          account: "eosio",
          name: "delegatebw",
          authorization: [
            {
              actor: creatorAccount,
              permission: "active",
            },
          ],
          data: {
            from: creatorAccount,
            receiver: accountName,
            stake_net_quantity: process.env.NET_STAKE || "0.00500000 WAX",
            stake_cpu_quantity: process.env.CPU_STAKE || "0.04500000 WAX",
            transfer: false,
          },
        },
      ],
    };

    while (retries < maxRetries) {
      try {
        const result = await api.transact(transaction, {
          blocksBehind: 3,
          expireSeconds: 30,
        });

        transactionId = result.transaction_id;

        if (!(await verifyTransaction(transactionId))) {
          throw new Error("Transaction verification failed");
        }

        if (!(await checkAccountExists(accountName))) {
          throw new Error("Account creation verification failed");
        }

        const resources = {
          ram: `${process.env.RAM_BYTES} bytes`,
          cpu: `${process.env.CPU_STAKE} WAX`,
          net: `${process.env.NET_STAKE} WAX`,
        };
        await logTransaction({
          accountName,
          transactionId,
          status: "success",
          ipAddress,
          resources,
        });

        return { success: true, accountName, transactionId, resources };
      } catch (error) {
        retries++;
        if (retries === maxRetries) {
          throw new Error(
            `Transaction failed after ${maxRetries} attempts: ${error.message}`
          );
        }
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * Math.pow(2, retries))
        );
      }
    }
  } catch (error) {
    const errorMessage = error.message || "Unknown error occurred";
    console.error("Error creating WAX account:", error);

    await logTransaction({
      accountName,
      transactionId,
      status: "failed",
      errorMessage,
      ipAddress,
    });

    let errorToReturn;
    if (error.message.includes("insufficient")) {
      errorToReturn = "Insufficient resources to create account";
    } else if (error.message.includes("already taken")) {
      errorToReturn = "Account name is already in use";
    } else if (
      error.message.includes("network") ||
      error.message.includes("timeout")
    ) {
      errorToReturn = "Network error occurred. Please try again";
    } else if (error.message.includes("public key is already in use")) {
      errorToReturn = error.message;
    } else {
      errorToReturn = `Failed to create account: ${errorMessage}`;
    }

    return { success: false, error: errorToReturn };
  }
}
