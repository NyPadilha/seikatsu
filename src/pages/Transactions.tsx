import React, { useEffect, useState } from 'react';
import { Transaction } from '../types/IFinance';
import { addTransaction, getTransactions } from '../services/api';
import { DiffAddedIcon, XCircleFillIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const addNewTransaction = async () => {
    const newTransaction = {
      id: transactions ? transactions[transactions.length - 1].id + 1 : 1,
      date: '',
      value: 0,
      category: '',
      description: '',
      account: '',
    }
    await addTransaction(newTransaction)
    setTransactions([...transactions, newTransaction])
  }

  useEffect(() => {
    async function fetchApi() {
      const transactions = await getTransactions()

      setTransactions(transactions)
    }

    fetchApi()
  }, [])

  return (
    <section id='transactions'>
      <div className='banner'>PlaceHolder</div>

      <div className='columns'>
        <h1 className='date'>Date</h1>
        <h1 className='value'>Value</h1>
        <h1 className='category'>Category</h1>
        <h1 className='description'>Description</h1>
        <h1 className='account'>Account</h1>
        <h1 className='add' onClick={addNewTransaction}><DiffAddedIcon /></h1>
      </div>
      <section>
        {transactions && transactions.map(transaction => (
          <div key={transaction.id}>
            <h2 className='date'>{transaction.date}</h2>
            <h2 className='value'>{transaction.value}</h2>
            <h2 className='category'>{transaction.category}</h2>
            <h2 className='description'>{transaction.description}</h2>
            <h2 className='account'>{transaction.account}</h2>
            <h2 className='delete'><XCircleFillIcon /></h2>
          </div>
        ))}
      </section>

      <Link className='back-btn' to='/finance'>Back</Link>
    </section>
  );
};

export default Transactions;