import React, { useState } from 'react';
import axios from 'axios';
import './Payment.css';

const PaymentForm = ({ clientToken, onNewTransaction }) => {
  const [paymentMethodNonce, setPaymentMethodNonce] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/process-payment', {
        paymentMethodNonce,
        amount
      });
      onNewTransaction({ id: Date.now(), amount, status: response.data.success ? 'Success' : 'Failed' });
    } catch (error) {
      console.error('Error processing payment', error);
      onNewTransaction({ id: Date.now(), amount, status: 'Failed' });
    }
  };

  return (
    <div className="payment-form-container">
      <h2 className="form-title">Process Payment</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="payment-method-nonce">Payment Method Nonce:</label>
          <input
            id="payment-method-nonce"
            type="text"
            value={paymentMethodNonce}
            onChange={(e) => setPaymentMethodNonce(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="submit-button">Pay</button>
      </form>
    </div>
  );
};

export default PaymentForm;