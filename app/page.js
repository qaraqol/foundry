"use client";
import { Layout, Row, Col, message } from "antd";
import { useState } from "react";
import HomeCard from "@/components/HomeCard";

const { Content } = Layout;

export default function HomePage() {
  const [accountDetails, setAccountDetails] = useState({
    accountName: "",
    ownerKey: "",
    activeKey: "",
  });
  const [errors, setErrors] = useState({
    accountName: "",
    ownerKey: "",
    activeKey: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(""); // Track current operation
  const [transactionError, setTransactionError] = useState(null);

  const handleAccountCreation = async (details) => {
    setIsSubmitting(true);
    setTransactionError(null);

    try {
      setCurrentStep("Validating account details...");
      const response = await fetch("/api/account-creator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      const data = await response.json();

      if (!response.ok) {
        setTransactionError(data.message);
        message.error({
          content: data.message,
          duration: 5,
        });
        return;
      }

      setCurrentStep("Creating WAX account...");
      if (data.details?.success) {
        message.success({
          content: "Account created successfully!",
          duration: 5,
        });
        setAccountDetails({ accountName: "", ownerKey: "", activeKey: "" });
        setErrors({ accountName: "", ownerKey: "", activeKey: "" });
      }
    } catch (error) {
      console.error("Error creating account:", error);
      const errorMessage = "Network error occurred. Please try again.";
      setTransactionError(errorMessage);
      message.error({
        content: errorMessage,
        duration: 5,
      });
    } finally {
      setIsSubmitting(false);
      setCurrentStep("");
    }
  };

  return (
    <Content style={{ padding: "0 20px" }}>
      <Row
        justify="center"
        align="middle"
        style={{
          marginTop: "40px",
          height: "auto",
        }}
      >
        <Col>
          <HomeCard
            accountDetails={accountDetails}
            setAccountDetails={setAccountDetails}
            errors={errors}
            setErrors={setErrors}
            isSubmitting={isSubmitting}
            onSubmit={handleAccountCreation}
            currentStep={currentStep}
            transactionError={transactionError}
          />
        </Col>
      </Row>
    </Content>
  );
}
