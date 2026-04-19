import express from "express";
import cors from "cors";
import pool from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "API is running successfully 🚀" });
});

// --- Users ---
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Insert failed:", error);
    res.status(500).json({ error: "Insert failed" });
  }
});

// --- Reservations ---
app.get("/api/reservations", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, phone, date, guests, message, newsletter, created_at FROM reservations ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.post("/api/reservations", async (req, res) => {
  try {
    const { name, email, phone, date, guests, message, newsletter } = req.body;

    if (!name || !email || !phone || !date || !guests) {
      return res.status(400).json({ error: "Pakollisia kenttiä puuttuu" });
    }

    const result = await pool.query(
      `INSERT INTO reservations (name, email, phone, date, guests, message, newsletter)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, email, phone, date, guests, message, newsletter, created_at`,
      [name, email, phone, date, Number(guests), message || null, Boolean(newsletter)]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Insert failed:", error);
    res.status(500).json({ error: "Tallennus epäonnistui" });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});


