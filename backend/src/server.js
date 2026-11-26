import app from "./app.js";
import { pool } from "./config/db.js";

const PORT = process.env.PORT || 3000;

try {
  await pool.query("select 1");
  console.log("Database connected");
} catch (err) {
  console.log("database connection failed", err.message);
}

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
