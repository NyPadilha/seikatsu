import React, { useEffect, useState } from 'react';
import { Transaction } from '../types/IFinance';
import { getTransactions, addTransaction } from '../services/api';
import { DiffAddedIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';
import TransactionRow from '../components/finance/TransactionRow';

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
          <TransactionRow
            key={transaction.id}
            transaction={transaction}
            onDelete={(id) => setTransactions(transactions.filter(t => t.id !== id))}
          />
        ))}
      </section>

      <Link className='back-btn' to='/finance'>Back</Link>
      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default Transactions;