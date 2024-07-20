import React, { useEffect, useState } from 'react';
import { Transaction } from '../../types/IFinance';
import { deleteTransaction } from '../../services/api';
import { XCircleFillIcon } from '@primer/octicons-react';

interface TransactionRowProps {
  transaction: Transaction;
  onDelete: (id: number) => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, onDelete }) => {
  const [date, setDate] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [account, setAccount] = useState<string>('');

  const delTransaction = async (id: number) => {
    await deleteTransaction(id)
    onDelete(id)
  }

  useEffect(() => {
    setDate(transaction.date)
    setValue(transaction.value)
    setCategory(transaction.category)
    setDescription(transaction.description)
    setAccount(transaction.account)
  }, []);

  return (
    <div>
      <h2 className='date'>{date}</h2>
      <div className='value'><h2>R$</h2><h2>{value.toFixed(2)}</h2></div>
      <h2 className='category'>{category}</h2>
      <h2 className='description'>{description}</h2>
      <h2 className='account'>{account}</h2>
      <h2 className='delete' onClick={() => delTransaction(transaction.id)}><XCircleFillIcon /></h2>
    </div>
  );
};

export default TransactionRow;