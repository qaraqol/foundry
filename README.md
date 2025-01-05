# WAX Account Creator

Web application for creating WAX blockchain accounts with configurable resource allocation.

## Features

- Create WAX accounts with owner and active keys
- Configurable RAM, CPU, and NET allocation
- Transaction logging with SQLite
- Account and key validation
- hCaptcha integration for bot prevention
- Error handling and transaction verification

## Dependencies

- Node.js 16+
- SQLite3
- eosjs
- hCaptcha

## Setup

1. Clone repository:

```bash
git clone <repository-url>
cd wax-account-creator
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
# WAX Account Creator Details
CREATOR_PRIVATE_KEY=your_private_key
CREATOR_ACCOUNT=your_account

# hCaptcha Keys
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_site_key
HCAPTCHA_SECRET_KEY=your_secret_key

# Resource Allocation
RAM_BYTES=3000
CPU_STAKE=10.00000000
NET_STAKE=0.50000000
```

4. Run development server:

```bash
npm run dev
```

## Resource Allocation

Default resource allocation per account:

- RAM: 3000 bytes
- CPU: 10.0000 WAX
- NET: 0.5000 WAX

Resources can be adjusted via environment variables.

## Transaction Logging

All transactions are logged in SQLite database with:

- Transaction ID
- Account name
- Resource allocation
- Status (success/failure)
- Error messages (if any)
- IP address
- Timestamp

## Security

- Public key validation
- Account name validation
- hCaptcha integration
- Resource limit checks
- Transaction verification
