import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { beta_router } from "./routes/beta_routes";
import cors from 'cors';

const app = express();
dotenv.config();

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(bodyParser.json());
app.use(cors(options))
app.use("/api/beta", beta_router);

app.listen(process.env.PORT, () => {
    console.log("Node server started running");
});
