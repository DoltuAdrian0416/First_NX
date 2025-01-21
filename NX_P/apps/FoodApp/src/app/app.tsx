import { AuthProvider, Routes } from '@./Components';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(
  'pk_test_51QiFLBLJaNVrlslmxh4jkLEoY5IVwpFSQYibXgxBHTA4dwrISVhKvXQwt0whlFBXDwobn74OsZZ8ZreIJ7FNmvE6004P1BGnIh'
);

export function App() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the clientSecret from your backend
    fetch('http://localhost:5158/api/payments/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000 }), // Amount in cents
    })
      .then((response) => response.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error('Error fetching clientSecret:', error));
  }, []);
  const appearance: StripeElementsOptions['appearance'] = {
    theme: 'night',
    variables: {
      colorPrimary: '#aed0e5',
      colorBackground: '#11688d',
      colorText: '#ffffff',
    },
  };
  console.log(clientSecret);
  const options = clientSecret ? { clientSecret, appearance } : undefined;

  return (
    <AuthProvider>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <Routes />
        </Elements>
      ) : (
        <div>Loading...</div>
      )}
    </AuthProvider>
  );
}

export default App;
