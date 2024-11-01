import React, { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { Button } from "@mui/material";

function PaymentComponent({montant,onSuccess,validate}) {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    // Obtenir le client token du serveur
    axios
      .get("http://localhost:4000/payement/braintree/token")
      .then((response) => setClientToken(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handlePayment = async () => {
    if(validate||validate()){
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const amount =montant>0?montant:10
      const result = await axios.post(
        "http://localhost:4000/payement/braintree/checkout",
        {
          paymentMethodNonce: nonce,
          amount,
        }
      );
     if (result.data.success) {
       
       onSuccess(); 
     } 
    } catch (err) {
      console.error(err);
      alert("Échec du paiement.");
    }
}
  };

  return (
    <div>
      {clientToken ? (
        <div>
          <DropIn
            options={{ authorization: clientToken }}
            onInstance={(instance) => setInstance(instance)}
          />
          <div className="mt-6">
            <Button
              variant="contained"
              color="success"
              className="w-full"
              onClick={handlePayment}
            >
              confirmer
            </Button>
          </div>
        </div>
      ) : (
        <div>Chargement...</div>
      )}
    </div>
  );
}

export default PaymentComponent;
