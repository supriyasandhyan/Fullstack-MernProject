import React from 'react';

const Transactions = ({ transactions }) => {
  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>
            {transaction.amount} - {transaction.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;