import React, { useEffect, useState } from 'react';
import { Transaction } from '../types/IFinance';
import { getTransactions, addTransaction, deleteTransaction } from '../services/api';
import { DiffAddedIcon, XCircleFillIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const addNewTransaction = async () => {
    const newDate = new Date()
    const newTransaction = {
      id: transactions.length ? transactions[transactions.length - 1].id + 1 : 1,
      date: `${newDate.getDate().toString().padStart(2, '0')}/${(newDate.getMonth() + 1).toString().padStart(2, '0')}/${newDate.getFullYear()}`,
      value: 0,
      category: '',
      description: '',
      account: '',
    }
    console.log(newTransaction)
    await addTransaction(newTransaction)
    setTransactions([...transactions, newTransaction])
  }

  const delTransaction = async (id: number) => {
    await deleteTransaction(id)
    setTransactions(transactions.filter(transaction => transaction.id !== id))
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
            <div className='value'><h2>R$</h2><h2>{transaction.value.toFixed(2)}</h2></div>
            <h2 className='category'>{transaction.category}</h2>
            <h2 className='description'>{transaction.description}</h2>
            <h2 className='account'>{transaction.account}</h2>
            <h2 className='delete' onClick={() => delTransaction(transaction.id)}><XCircleFillIcon /></h2>
          </div>
        ))}
      </section>

      <Link className='back-btn' to='/finance'>Back</Link>
    </section>
  );
};

export default Transactions;