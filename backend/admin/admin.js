import express from "express";
import databaseConnection from "../bdConnexion.js";
import morgan from "morgan";
import dotenv from "dotenv";
import adresseRouter from "../admin/routers/adresse.js"
import couleurRouter from "../admin/routers/couleur.js"
import categorieVeloRouter from "../admin/routers/categorieVelo.js";
import typeRouter from "./routers/type.js";
import marqueRouter from "./routers/marque.js"
import selleRouter from "./routers/selle.js";
import roueRouter from "./routers/roue.js";
import moteurRouter from "./routers/moteur.js"
import genreRouter from "./routers/genre.js"
import freinRouter from "./routers/frein.js"
import categorieAgeRouter from "./routers/categorieAge.js";
import cadreRouter from "./routers/cadre.js"
import veloVenteRouter from "./routers/veloVente.js";
import veloLocationRouter from "./routers/veloLocation.js";
import guideRouter from "./routers/guide.js";
import commandeRouter from "./routers/commande.js";
dotenv.config();
const port = process.env.PORT;
const app = express();

/* databaseConnection();


app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); */

app.use("/admin/adresses",adresseRouter);
app.use("/admin/couleurs",couleurRouter);
app.use("/admin/categories",categorieVeloRouter);
app.use("/admin/types",typeRouter);
app.use("/admin/marques",marqueRouter);
app.use("/admin/selles",selleRouter);
app.use("/admin/roues",roueRouter);
app.use("/admin/moteurs",moteurRouter);
app.use("/admin/genres",genreRouter);
app.use("/admin/freins",freinRouter);
app.use("/admin/categoriesAge",categorieAgeRouter);
app.use("/admin/cadres",cadreRouter);
app.use("/admin/veloVentes",veloVenteRouter);
app.use("/admin/veloLocations",veloLocationRouter);
app.use("/admin/guides",guideRouter);
app.use("/admin/commandes", commandeRouter);

export default app;
