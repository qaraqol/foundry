import sqlite3 from "sqlite3";
import { mkdir } from "fs/promises";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "transactions.db");

export async function initializeDb() {
  try {
    // Create data directory if it doesn't exist
    await mkdir(path.join(process.cwd(), "data"), { recursive: true });

    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          reject(err);
          return;
        }

        db.run(
          `CREATE TABLE IF NOT EXISTS account_creations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          account_name TEXT NOT NULL,
          transaction_id TEXT,
          status TEXT NOT NULL,
          error_message TEXT,
          ip_address TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          resources TEXT
        )`,
          (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(db);
            }
          }
        );
      });
    });
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}
