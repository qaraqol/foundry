"use client";
import React from "react";
import { Card, Typography, List } from "antd";

const { Title, Text, Paragraph } = Typography;

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
        <Paragraph>
          <Text strong>Public Keys</Text> are shared openly and used to receive
          cryptocurrency or verify digital signatures. They act like a bank
          account number that others can use to send you funds.
          <br />
          <Text strong>Private Keys</Text> are secret and should never be
          shared. They allow you to access and spend your cryptocurrency,
          similar to a bank account password. Keeping your private key secure is
          crucial to protecting your digital assets.
        </Paragraph>
      ),
    },
    {
      question: "What is the difference between Owner and Active Keys?",
      answer: (
        <Paragraph>
          <Text strong>Owner Keys</Text> provide the highest level of permission
          on a blockchain account. They can: Change other permission levels
          Recover the account if active keys are compromised <br />
          <Text strong>Active Keys</Text> are used for everyday transactions
          like: Sending and receiving tokens, Staking, and Voting. <br /> <br />
          <Text italic>
            For security, it's recommended to keep owner keys offline and use
            active keys for regular activities.
          </Text>
        </Paragraph>
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
