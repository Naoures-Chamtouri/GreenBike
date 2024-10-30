import express from "express";

import dotenv from "dotenv";

import authenticationRouter from "./routers/authentication.js";
import profileRouter from "./routers/profile.js";
import categorieRouter from "./routers/categorieVelo.js";
import typeRouter from "./routers/type.js";
import marqueRouter from "./routers/marque.js";
import veloVenteRouter from "./routers/veloVente.js";
import avisRouter from "./routers/avis.js";
import veloLocationRouter from "./routers/veloLocation.js";
import baladeRouter from "./routers/balade.js";
import locationRouter from "./routers/location.js";
import reservationRouter from "./routers/reservation.js";
import adresseRouter from "./routers/adresse.js";
import panierRouter from "./routers/panier.js";
import commandeRouter from "./routers/commande.js";
import payementRouter from "./routers/payement.js";

dotenv.config();
const port = process.env.PORT;
const app = express();

/* databaseConnection();


app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); */

app.use("/client", authenticationRouter);
app.use("/client/profile", profileRouter);
app.use("/client/categories", categorieRouter);
app.use("/client/types", typeRouter);
app.use("/client/marques", marqueRouter);
app.use("/client/veloVentes", veloVenteRouter);
app.use("/client/avis", avisRouter);
app.use("/client/veloLocations", veloLocationRouter);
app.use("/client/balades", baladeRouter);
app.use("/client/locations", locationRouter);
app.use("/client/reservations", reservationRouter);
app.use("/client/adresses", adresseRouter);
app.use("/client/panier", panierRouter);
app.use("/client/commandes", commandeRouter);
app.use("/create-payment-intent", payementRouter);

export default app;
