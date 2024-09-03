import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    sameSite: 'strict', 
    maxAge: 10 * 24 * 60 * 60 * 1000, 
  });
};

export default generateToken;
