/* import stripe from "stripe"
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
}; */
import braintree from "braintree"
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // ou Production
  merchantId: "d945wsgspbp9vvvy",
  publicKey: "54znmztb3mzdx3y5",
  privateKey: "45a56b03a25adcf57ed489df137bde8a",
});

const keyClient = async (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    
    res.send(response.clientToken);
  });
};

const payement = async (req, res) => {

  const nonceFromClient = req.body.paymentMethodNonce;
  const amount = req.body.amount; // Montant à traiter

  gateway.transaction.sale(
    {
      amount: amount,
      paymentMethodNonce: nonceFromClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err || !result.success) {
        console.log(err)
        return res.status(500).send(err || result.message);
      }
      res.send(result);
    }
  );
};
export default {payement,keyClient}