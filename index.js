import express from "express";
import mysql from "mysql";
import cors from "cors";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/offert", (req, res) => {
  const q = "SELECT * FROM offerts";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/offert", (req, res) => {
  const q = "INSERT INTO offerts (tittle, description) VALUES (?)";
  const values = [req.body.tittle, req.body.description];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/offert/:idOfferts", (req, res) => {
  const offertId = req.params.idOfferts;
  const q = "DELETE FROM offerts WHERE idOfferts = ?";

  db.query(q, [offertId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Offert has been deleted successfully.");
  });
});

app.put("/offert/:idOfferts", (req, res) => {
  const offertId = req.params.idOfferts;
  const q =
    "UPDATE offerts SET tittle = ?, description = ? WHERE idOfferts = ?";

  const values = [req.body.tittle, req.body.description];

  db.query(q, [...values, offertId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Offert has been updated successfully.");
  });
});

app.listen(36608, () => {
  console.log("connected to backend!");
});
