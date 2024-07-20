import React, { useEffect, useState } from 'react';
import { Transaction } from '../../types/IFinance';
import { XCircleFillIcon } from '@primer/octicons-react';
import {
  deleteTransaction,
  updateTransactionDate,
  updateTransactionValue,
  updateTransactionCategory,
  updateTransactionDescription,
  updateTransactionAccount,
} from '../../services/api';

interface TransactionRowProps {
  transaction: Transaction;
  availableCategories: string[];
  availableAccounts: string[];
  onDelete: (id: number) => void;
  onDateChange: (id: number, date: string) => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, onDelete, availableCategories, availableAccounts, onDateChange }) => {
  const [date, setDate] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [account, setAccount] = useState<string>('');
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);
  const [isEditingValue, setIsEditingValue] = useState<boolean>(false);
  const [isEditingCategory, setIsEditingCategory] = useState<boolean>(false);
  const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false);
  const [isEditingAccount, setIsEditingAccount] = useState<boolean>(false);

  const delTransaction = async (id: number) => {
    await deleteTransaction(id)
    onDelete(id)
  }

  const handleDateBlur = async () => {
    setIsEditingDate(false)
    await updateTransactionDate(transaction.id, date)
  }

  const onDateKeyPress = async ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleDateBlur()
      onDateChange(transaction.id, date)
    }
  }

  const handleValueBlur = async () => {
    setIsEditingValue(false)
    await updateTransactionValue(transaction.id, value)
  }

  const onValueKeyPress = async ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleValueBlur()
    }
  }

  const handleDescriptionBlur = async () => {
    setIsEditingDescription(false)
    await updateTransactionDescription(transaction.id, description)
  }

  const onDescriptionKeyPress = async ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleDescriptionBlur()
    }
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
      {isEditingDate ? (
        <input
          className='input-date'
          type='text'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={handleDateBlur}
          onKeyDown={onDateKeyPress}
          autoFocus
        />
      ) : (
        <h2 className='date' onDoubleClick={() => setIsEditingDate(true)}>{date}</h2>
      )}
      {isEditingValue ? (
        <input
          type='number'
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          onBlur={handleValueBlur}
          onKeyDown={onValueKeyPress}
          autoFocus
        />
      ) : (
        <div className='value' onDoubleClick={() => setIsEditingValue(true)}><h2>R$</h2><h2>{value.toFixed(2)}</h2></div>
      )}
      <h2
        onClick={() => setIsEditingCategory(true)}
        className={isEditingCategory ? 'clicked category' : 'category'}
      >{category}</h2>
      {isEditingCategory && (
        <div
          className='category-options'
          style={{ marginTop: availableCategories.length * 25 + 23 }}
        >
          {availableCategories.map((cat, index) => (
            <p key={index} onClick={async () => {
              setCategory(cat)
              await updateTransactionCategory(transaction.id, cat)
              setIsEditingCategory(false)
            }}>{cat}</p>
          ))}
        </div>
      )}
      {isEditingDescription ? (
        <input
          className='input-description'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleDescriptionBlur}
          onKeyDown={onDescriptionKeyPress}
          autoFocus
        />
      ) : (
        <h2 className='description' onDoubleClick={() => setIsEditingDescription(true)}>{description}</h2>
      )}
      <h2
        onClick={() => setIsEditingAccount(true)}
        className={isEditingAccount ? 'clicked account' : 'account'}
      >{account}</h2>
      {isEditingAccount && (
        <div
          className='account-options'
          style={{ marginTop: availableAccounts.length * 25 + 23 }}
        >
          {availableAccounts.map((acc, index) => (
            <p key={index} onClick={async () => {
              setAccount(acc)
              await updateTransactionAccount(transaction.id, acc)
              setIsEditingAccount(false)
            }}>{acc}</p>
          ))}
        </div>
      )}
      <h2 className='delete' onClick={() => delTransaction(transaction.id)}><XCircleFillIcon /></h2>
    </div>
  );
};

export default TransactionRow;