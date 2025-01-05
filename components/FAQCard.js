"use client";
import React from "react";
import { Card, Typography, List } from "antd";

const { Title, Text } = Typography;

const FAQCard = () => {
  const faqData = [
    {
      question: "What is foundry?",
      answer: (
        <>
          <Text>
            <b>foundry</b> is a tool designed to easily create accounts on the
            WAX Blockchain
          </Text>
        </>
      ),
    },
    {
      question: "How do I generate keys so I can create an account?",
      answer: (
        <List
          dataSource={["Using the Anchor wallet to generate keys."]}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ),
    },
    {
      question: "What is the difference between public and private keys?",
      answer: (
        <Text>
          In a cryptocurrency context, public and private keys are cryptographic
          keys used for securing transactions and ensuring the integrity of the
          blockchain. Public Key: Purpose: The public key is used as an address
          to receive funds or data. It is visible to others and can be freely
          shared. How it Works: The public key is derived from the private key
          using a cryptographic function. It allows others to send transactions
          to you but does not allow them to spend your funds. Visibility: It’s
          meant to be shared openly and used by others to identify you or your
          wallet. Example: Think of it like your email address, where others can
          send you messages (funds) without being able to read your messages
          (access your funds). Private Key: Purpose: The private key is used to
          sign transactions, proving ownership of the funds or assets linked to
          the public key. How it Works: It allows you to access and control the
          funds associated with your public key. The private key is kept secret
          and should never be shared with others. Visibility: It should be kept
          private, and anyone who has access to your private key can control
          your funds. Example: It’s like the password to your email account,
          allowing you to sign in and read or send messages (spend funds). Key
          Points: Public Key: Visible to everyone, used to receive funds.
          Private Key: Secret, used to authorize transactions and spend funds.
          Loss of a private key means losing access to the associated funds, and
          sharing it with others compromises your security.
        </Text>
      ),
    },
    {
      question: "What is the difference between Owner and Active Keys?",
      answer: (
        <List
          dataSource={[
            "Enter your WAX account name.",
            "Select how many transactions you want to export.",
            'Click on "Export": The tool will process your request and generate a CSV file.',
            "Download the CSV file: Save the file to your device when prompted.",
          ]}
          renderItem={(item) => <List.Item>• {item}</List.Item>}
        />
      ),
    },
  ];

  return (
    <>
      &nbsp;
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>Frequently Asked Questions</span>
          </div>
        }
        style={{
          width: "40vw",
          padding: "20px",
          boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.15)",
          borderRadius: "25px",
        }}
      >
        <List
          dataSource={faqData}
          renderItem={(faq) => (
            <List.Item>
              <div style={{ marginBottom: "16px" }}>
                <Title level={5} style={{ marginBottom: "8px" }}>
                  {faq.question}
                </Title>
                {faq.answer}
              </div>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default FAQCard;
