import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = async (destinataire, sujet, texte) => {
  const optionsEmail = {
    from: process.env.EMAIL, 
    to: destinataire, 
    subject: sujet, 
    text: texte,
  };

  try {
    const info = await transporter.sendMail(optionsEmail);
    console.log("Email envoyé avec succès :", info.response);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
  }
};

export default sendEmail