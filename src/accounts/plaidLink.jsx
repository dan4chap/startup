import React, { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const PlaidLink = () => {
  const [linkToken, setLinkToken] = useState(null);

  // Fetch link token from backend
  const createLinkToken = async () => {
    try {
      const response = await fetch('api/create_link_token', {
        method: 'POST',
      });
      const data = await response.json();
      setLinkToken(data.link_token); // Set the link token
    } catch (error) {
      console.error('Error fetching link token:', error);
    }
  };

  // Call createLinkToken when the component mounts
  useEffect(() => {
    createLinkToken();
  }, []);

  // Handle Plaid Link success
  const onSuccess = async (public_token) => {
    try {
      await fetch('/exchange_public_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token }),
      });
      alert('Bank account connected successfully!');
    } catch (error) {
      console.error('Error exchanging public token:', error);
    }
  };

  // Configure Plaid Link
  const config = {
    token: linkToken,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <div>
      <button onClick={() => open()} disabled={!ready}>
        Connect Bank Account
      </button>
    </div>
  );
};

export default PlaidLink;