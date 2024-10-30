/* import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  ("pk_test_51QDyOMRuqYMk4kWUJEqrVQDD2i5L1fJ99oDsgkAXKPupYYzQQJNVk0ORGovdl6KQ4sBhbRykex4NvGAbXlgaSCSg00Rh53iLQi")
);


export default function StripeCheckout( {amount}) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // replace this with your own server endpoint
   fetch('http://localhost:4000/create-payment-intent', {
    method: 'POST',
     mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
     
    },
    body: JSON.stringify({ amount }), // Envoie le montant
  })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const options = {
    clientSecret,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
 */