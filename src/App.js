import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import router from './router/index.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
app.use(router);
// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
