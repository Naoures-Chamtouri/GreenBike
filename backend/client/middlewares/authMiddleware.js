import jwt from 'jsonwebtoken';

import Student from  './models/Student.js';
import Client from '../../models/client.js';

const protect = async (req, res, next) => {

    try{
  let token;

  
  token = req.cookies.jwt;

  if (token) {
   
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.student = await Client.findById(decoded.client._id).select('-motDePasse');

      next();
    
      console.error(error);
       return res.status(404).json({status:httpStatus.ERROR, message: "Non autorisée" });
    
  }} catch(error) {
    res.status(500).json({ message: "Not authorized, no token" });
  }
};


export { protect };
