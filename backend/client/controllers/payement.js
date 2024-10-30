import stripe from "stripe"
import dotenv from "dotenv";

dotenv.config()

const Stripe=stripe(process.env.PAY_KEY)

const payement = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await Stripe.paymentIntents.create({
      amount, 
      currency: "usd", 
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default payement