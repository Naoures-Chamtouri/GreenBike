import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import dotenv from "dotenv";
import Image from "../models/image.js";
dotenv.config();

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Accès non autorisé, pas de token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.userId)
      .select("-motDePasse")
      .populate({ path: "image", model: Image });

    if (!admin) {
      return res.status(404).json({ message: "client non trouvé" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Accès non autorisé, token invalide" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role == "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { adminAuthMiddleware, admin };
