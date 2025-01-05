"use client";
import { useState, useRef } from "react";
import {
  Input,
  Tooltip,
  Button,
  Space,
  Card,
  Alert,
  Typography,
  Modal,
  Spin,
} from "antd";
import {
  InfoCircleOutlined,
  UserOutlined,
  KeyOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const { Title, Text } = Typography;

const HomeCard = ({
  accountDetails,
  setAccountDetails,
  errors,
  setErrors,
  isSubmitting,
  onSubmit,
  currentStep,
  transactionError,
}) => {
  const [showPrivateKeyWarning, setShowPrivateKeyWarning] = useState(false);
  const [isCaptchaModalVisible, setIsCaptchaModalVisible] = useState(false);
  const captchaRef = useRef(null);

  const handleChange = (field, value) => {
    setAccountDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
    validateField(field, value);
  };
  const validateField = (field, value) => {
    if (field === "accountName") {
      validateAccountName(value);
    } else if (field === "ownerKey" || field === "activeKey") {
      validatePublicKey(value, field);
    }
  };

  const validateAccountName = (value) => {
    const regex = /^[a-z1-5]{12}$/;
    if (!regex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        accountName:
          "Account name must be exactly 12 characters long, using only lowercase letters (a-z) and numbers (1-5).",
      }));
    } else {
      setErrors((prev) => ({ ...prev, accountName: "" }));
    }
  };

  const validatePublicKey = (value, field) => {
    const regex1 = /^PUB_K1_[1-9A-HJ-NP-Za-km-z]{50}$/;
    const regex2 = /^EOS[1-9A-HJ-NP-Za-km-z]{50}$/;

    if (!regex1.test(value) && !regex2.test(value)) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Invalid public key format. Must start with EOS or PUB_K1_",
      }));

      if (value && !value.startsWith("EOS") && !value.startsWith("PUB_K1_")) {
        setShowPrivateKeyWarning(true);
      } else {
        setShowPrivateKeyWarning(false);
      }
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
      setShowPrivateKeyWarning(false);
    }
  };

  const validateAllFields = () => {
    // Create a new errors object
    let newErrors = {};

    // Validate account name
    const regex = /^[a-z1-5]{12}$/;
    if (!regex.test(accountDetails.accountName)) {
      newErrors.accountName =
        "Account name must be exactly 12 characters long, using only lowercase letters (a-z) and numbers (1-5).";
    }

    // Validate owner key
    const keyRegex1 = /^PUB_K1_[1-9A-HJ-NP-Za-km-z]{50}$/;
    const keyRegex2 = /^EOS[1-9A-HJ-NP-Za-km-z]{50}$/;

    if (
      !keyRegex1.test(accountDetails.ownerKey) &&
      !keyRegex2.test(accountDetails.ownerKey)
    ) {
      newErrors.ownerKey =
        "Invalid public key format. Must start with EOS or PUB_K1_";
    }

    // Validate active key
    if (
      !keyRegex1.test(accountDetails.activeKey) &&
      !keyRegex2.test(accountDetails.activeKey)
    ) {
      newErrors.activeKey =
        "Invalid active key format. Must start with EOS or PUB_K1_";
    }

    // Update the errors state
    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccount = () => {
    if (validateAllFields()) {
      setIsCaptchaModalVisible(true);
    }
  };

  const handleSubmit = (token) => {
    onSubmit({ ...accountDetails, captchaToken: token });
    setIsCaptchaModalVisible(false);
    captchaRef.current?.resetCaptcha();
  };

  const handleCaptchaVerify = (token) => {
    handleSubmit(token);
  };

  const handleModalCancel = () => {
    setIsCaptchaModalVisible(false);
    captchaRef.current?.resetCaptcha();
  };
  return (
    <Card
      title={
        <div style={{ textAlign: "center", padding: "12px 0" }}>
          <Title level={2} style={{ margin: 0 }}>
            Create WAX Account
          </Title>
        </div>
      }
      style={{
        width: "100%",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      {isSubmitting && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.8)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          {currentStep && <Text strong>{currentStep}</Text>}
        </div>
      )}

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {transactionError && (
          <Alert
            message="Transaction Failed"
            description={transactionError}
            type="error"
            showIcon
            closable
          />
        )}

        <Alert
          message={
            <Space>
              <InfoCircleOutlined />
              Create your WAX account in minutes. Learn how to generate your
              accounts keys in the FAQ
            </Space>
          }
          type="info"
          showIcon={false}
        />

        {showPrivateKeyWarning && (
          <Alert
            message="Warning: Never share your private key or you will lose your assets!"
            type="error"
            showIcon
          />
        )}

        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div>
            <Text strong>Account Name</Text>
            <Tooltip title="Account names must be exactly 12 characters long, using only lowercase letters (a-z) and numbers (1-5)">
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter account name"
                value={accountDetails.accountName}
                onChange={(e) => handleChange("accountName", e.target.value)}
                size="large"
                status={errors.accountName ? "error" : ""}
                disabled={isSubmitting}
              />
            </Tooltip>
            {errors.accountName && (
              <Text type="danger" style={{ display: "block", marginTop: 4 }}>
                {errors.accountName}
              </Text>
            )}
          </div>

          {/* Similar pattern for owner key and active key inputs */}
          <div>
            <Text strong>Owner Key</Text>
            <Tooltip title="Enter your PUBLIC key (starts with EOS or PUB_K1_)">
              <Input
                prefix={<KeyOutlined />}
                placeholder="Enter owner public key"
                value={accountDetails.ownerKey}
                onChange={(e) => handleChange("ownerKey", e.target.value)}
                size="large"
                status={errors.ownerKey ? "error" : ""}
                disabled={isSubmitting}
              />
            </Tooltip>
            {errors.ownerKey && (
              <Text type="danger" style={{ display: "block", marginTop: 4 }}>
                {errors.ownerKey}
              </Text>
            )}
          </div>

          <div>
            <Text strong>Active Key</Text>
            <Tooltip title="Enter your PUBLIC key (starts with EOS or PUB_K1_)">
              <Input
                prefix={<KeyOutlined />}
                placeholder="Enter active public key"
                value={accountDetails.activeKey}
                onChange={(e) => handleChange("activeKey", e.target.value)}
                size="large"
                status={errors.activeKey ? "error" : ""}
                disabled={isSubmitting}
              />
            </Tooltip>
            {errors.activeKey && (
              <Text type="danger" style={{ display: "block", marginTop: 4 }}>
                {errors.activeKey}
              </Text>
            )}
          </div>
        </Space>

        <Button
          type="primary"
          onClick={handleCreateAccount}
          size="large"
          block
          disabled={
            isSubmitting || Object.values(errors).some((error) => error !== "")
          }
          loading={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>

        <Card size="small" style={{ backgroundColor: "#fafafa" }}>
          <Text strong>Temporary Sponsored Account Resources</Text>
          <div style={{ marginTop: 8 }}>
            <Space direction="vertical">
              <Text>• CPU: 10 WAX</Text>
              <Text>• NET: 0.5 WAX</Text>
              <Text>• RAM: 3000 bytes</Text>
            </Space>
          </div>
        </Card>
      </Space>

      <Modal
        title="Verify you're human"
        open={isCaptchaModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        centered
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 0",
          }}
        >
          <HCaptcha
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
            onVerify={handleCaptchaVerify}
            ref={captchaRef}
          />
        </div>
      </Modal>
    </Card>
  );
};

export default HomeCard;
