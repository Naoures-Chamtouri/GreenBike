import jwt from "jsonwebtoken";
import Guide from "../models/guide.js"; 
import dotenv from "dotenv";
dotenv.config();

const guideAuthMiddleware = async (req, res, next) => {
  try {
    // Récupérer le token du cookie
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Accès non autorisé, pas de token" });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const guide = await Guide.findById(decoded.userId);

    if (!guide) {
      return res.status(404).json({ message: "Guide non trouvé" });
    }

    req.guide = guide;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Accès non autorisé, token invalide" });
  }
};

export default guideAuthMiddleware;
