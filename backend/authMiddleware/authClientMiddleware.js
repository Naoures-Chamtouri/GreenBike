import jwt from "jsonwebtoken";
import Client from "../models/client.js";
import dotenv from "dotenv";
dotenv.config();
import Image from "../models/image.js";

const clientAuthMiddleware = async (req, res, next) => {
  try {
    
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Accès non autorisé, pas de token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const client = await Client.findById(decoded.userId)
      .select("-motDePasse")
      .populate({
        path: "utilisateur",
        populate: { path: "image", model: Image }
       
      });

    if (!client) {
      return res.status(404).json({ message: "client non trouvé" });
    }

    req.client = client;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Accès non autorisé, token invalide" });
  }
};

export default clientAuthMiddleware;
