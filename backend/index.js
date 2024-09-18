import express from "express";
import adminApp from "./admin/admin.js"
import guideApp from "./guide/guide.js"
import clientApp from "./client/client.js"
import dotenv from "dotenv";
import databaseConnection from "./bdConnexion.js";
import morgan from "morgan";
import cors from "cors";

const app = express();
databaseConnection();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config()
const port=process.env.PORT

app.use(adminApp);
app.use(guideApp);
app.use(clientApp);

app.listen(port, () => {
  console.log("listening on port ");
});