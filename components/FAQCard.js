"use client";
import React from "react";
import { Card, Typography, List, Anchor } from "antd";

const { Title, Text, Paragraph } = Typography;

const FAQCard = () => {
  const faqData = [
    {
      question: "What is Foundry?",
      answer: (
        <>
          <Text>
            <b>Foundry</b> is a tool designed to easily create accounts on the
            WAX Blockchain, developed to make it easier to onboard new users
            onto WAX.
          </Text>
        </>
      ),
    },
    {
      question: "How is the platform free?",
      answer: (
        <>
          <Text>
            The platform is sponsored by <b>Qaraqol</b>, one of the leading WAX
            Guilds, in order to help make it easy for new users to try out WAX.
          </Text>
        </>
      ),
    },
    {
      question: "How long do the temporary resources staked last?",
      answer: (
        <>
          <Text>Between 24 hours to 7 days, depending on platform usage.</Text>
        </>
      ),
    },
    {
      question: "Is my account secure?",
      answer: (
        <>
          <Text>
            Yes, we only require your public keys so we can create your account
            on the blockchain. Your private keys or what is required to access
            your account is NOT required.
          </Text>
        </>
      ),
    },
    {
      question: "How do I generate keys so I can create an account?",
      answer: (
        <Paragraph>
          We recommend downloading and using{" "}
          <a href="https://www.greymass.com/anchor" target="_blank">
            Anchor
          </a>{" "}
          by Greymass to generate your keys securely. Once you install Anchor
          and enable the WAX chain, click “Tools” and then “Manage Keys” under
          Security. Then click “Generate Key Pairs” to generate two key pairs.
          This will generate two public keys and two private keys.
          <br />
          We recommend saving these keys to your Anchor wallet and saving them
          <a
            href="https://waxsweden.org/private-key-management-for-dummies/"
            target="_blank"
          >
            {" "}
            securely{" "}
          </a>
          to your computer and in real life. There is NO way to recover your
          account if you lose your private keys, so make sure they are backed up
          securely and in multiple places.
          <br />
          Next, create a name that follows the requirements and enter your
          public keys into our account creator. You can input either public key
          into each box. The private key that goes with the public key will be
          how you will access your account with the corresponding permission
          (owner or active.)
          <br />
          Click “Create Account” and complete the CAPTCHA and your account will
          be created!
        </Paragraph>
      ),
    },
    {
      question: "How do I access my account?",
      answer: (
        <Paragraph>
          After creating your account, you will need to import it into Anchor to
          access it. Click “Import Private Key” and enter the private key you
          generated before. Do this for both private keys you generated, so you
          have both the active and owner keys imported. Then, after selecting
          the accounts you can interact with almost every WAX Dapp!
        </Paragraph>
      ),
    },
    {
      question: "What is the difference between public and private keys?",
      answer: (
        <Paragraph>
          <Text strong>Public Keys</Text> are linked to your WAX account and
          serves as an identifier for the account. These keys can be viewed by
          anyone on the blockchain.
          <br />
          <Text strong>Private Keys</Text> are secret and should NEVER be
          shared. They allow you to access your account and spend your
          cryptocurrency, similar to a bank account password. Keeping your
          private key secure is crucial and extremely important.
        </Paragraph>
      ),
    },
    {
      question: "What is the difference between Owner and Active Keys?",
      answer: (
        <Paragraph>
          <Text strong>Owner Keys</Text> provide the highest level of permission
          on a blockchain account. They can change other permission levels and
          has “root” or full access to your account <br />
          <Text strong>Active Keys</Text> are used for everyday transactions
          like: sending tokens or NFTs, staking, and voting. <br /> <br />
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
