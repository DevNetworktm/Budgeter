import "dotenv/config";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as mongoose from "mongoose";
import path from "path";

// Routes
import indexRoute from "./routes";
import authRoute from "./routes/auth";

const app = express();

const rest = mongoose.connect(process.env.MONGODB_URL);
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "../public/")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", indexRoute);
app.use("/auth", authRoute);

app.listen(2000, () => {
    console.log("App listen http://localhost:2000")
})