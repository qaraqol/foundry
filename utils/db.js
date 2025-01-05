// utils/db.js
import { initializeDb } from "./initDb";

export async function logTransaction(data) {
  const db = await initializeDb();

  return new Promise((resolve, reject) => {
    const {
      accountName,
      transactionId,
      status,
      errorMessage,
      ipAddress,
      resources,
    } = data;

    db.run(
      `INSERT INTO account_creations (
        account_name, transaction_id, status, error_message, ip_address, resources
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        accountName,
        transactionId,
        status,
        errorMessage,
        ipAddress,
        JSON.stringify(resources),
      ],
      function (err) {
        db.close();

        if (err) {
          reject(err);
          return;
        }

        resolve(this.lastID);
      }
    );
  });
}
