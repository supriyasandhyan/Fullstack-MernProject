// src/App.js
// import React from "react";
// import RegisterForm from "./Components/RegisterForm";
// import Product from "./Components/Product";

// const App = () => {
//   return (
//     <div>
//       <h1>User Registration</h1>
//           <RegisterForm />
//           <Product/>
//       </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import PaymentForm from './Components/PaymentForm';
import Transactions from './Components/Transaction';
import axios from 'axios';

const App = () => {
  const [clientToken, setClientToken] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch client token
    axios.get('http://localhost:8000/api/v1/user/get-client-token')
      .then(response => {
        setClientToken(response.data);
      })
      .catch(error => {
        console.error('Error fetching client token', error);
      });

    // Dummy transactions
    setTransactions([
      { id: 1, amount: '200.00', status: 'Success' },
      { id: 2, amount: '500.00', status: 'Success' }
    ]);
  }, []);

  const handleNewTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  return (
    <div>
      <h1>Payment Gateway</h1>
      <PaymentForm clientToken={clientToken} onNewTransaction={handleNewTransaction} />
      <Transactions transactions={transactions} />
    </div>
  );
};

export default App;
