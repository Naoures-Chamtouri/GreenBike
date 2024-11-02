
import dotenv from "dotenv";
dotenv.config()

import braintree from "braintree";
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, // ou Production
  merchantId:process.env.MERCHANT,
  publicKey:process.env.PUBLIC_KEY,
  privateKey:process.env.PRIVATE_KEY,
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
        console.log(err);
        return res.status(500).send(err || result.message);
      }
      res.send(result);
    }
  );
};
export default { payement, keyClient };
