import express from "express";
import authenticationRouter from "./routers/authentication.js";
import baladeRouter from "./routers/balade.js";
const app = express();

app.use("/guide",authenticationRouter);
app.use("/guide/balades",baladeRouter)
/* 
databaseConnection();
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); */


export default app
