import express from "express";
import adminApp from "./admin/admin.js";
import guideApp from "./guide/guide.js";
import clientApp from "./client/client.js";
import dotenv from "dotenv";
import databaseConnection from "./bdConnexion.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

const app = express();

databaseConnection();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
     
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("tiny"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

dotenv.config();
const port = process.env.PORT;

app.use(adminApp);
app.use(guideApp);
app.use(clientApp);

app.listen(port, () => {
  console.log("listening on port ");
});
