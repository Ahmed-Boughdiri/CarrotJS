import express,{ json } from "express";
import auth from "./routes/Auth";
import dotenv from "dotenv";
import mongoose from "mongoose";

//mongoose.connect(process.env.DB || "", () =>console.log("DB Connected Successfully ..."))

dotenv.config();

// Setup The Server
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>console.log(`Server Running On Port ${PORT}...`))

// Middlewares
app.use(json());
app.use("/api/auth",auth)

