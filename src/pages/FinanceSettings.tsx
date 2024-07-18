import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Account, CategoryTag, Category, Creditor } from '../types/IFinance';
import { addAccount, addCategory, addCreditor, getAccounts, getCategories, getCreditors, deleteAccount, deleteCategory, deleteCreditor } from '../services/api';
import { DiffAddedIcon } from '@primer/octicons-react';

const FinanceSettings: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [creditors, setCreditors] = useState<Creditor[]>([]);
  const [isEditingCreditor, setIsEditingCreditor] = useState<boolean>(false);
  const [newCreditor, setNewCreditor] = useState<string>('');
  const [isEditingCategory, setIsEditingCategory] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>('');
  const [isEditingAccount, setIsEditingAccount] = useState<boolean>(false);
  const [newAccount, setNewAccount] = useState<string>('');

  const addNewAccount = async () => {
    const newAccount: Account = {
      name: 'New Account',
      tag: 'bank',
      balance: 0,
    };

    await addAccount(newAccount);
    accounts ? setAccounts([...accounts, newAccount]) : setAccounts([newAccount]);
  };

  const addNewCategory = async (type: CategoryTag) => {
    const newCategory = {
      name: 'New Category',
      tag: type === 'income' ? 'income' : 'expense',
    };

    await addCategory(newCategory);
    categories ? setCategories([...categories, newCategory]) : setCategories([newCategory]);
  };

  const addNewCreditor = async () => {
    const newCreditor = {
      name: 'New Creditor',
    };

    await addCreditor(newCreditor);
    creditors ? setCreditors([...creditors, newCreditor]) : setCreditors([newCreditor]);
  };

  const delAccount = async (name: string) => {
    await deleteAccount(name);
    setAccounts(accounts.filter(account => account.name !== name));
  };

  const delCategory = async (name: string) => {
    await deleteCategory(name);
    setCategories(categories.filter(category => category.name !== name));
  };

  const delCreditor = async (name: string) => {
    await deleteCreditor(name);
    setCreditors(creditors.filter(creditor => creditor.name !== name));
  };

  // const handleCreditorBlur = async () => {
  //   setIsEditingCreditor(false);
  //   setCreditors(creditors.map(creditor => {
  //     if (creditor.name === newCreditor) {
  //       return creditor;
  //     } else {
  //       return creditor;
  //     }
  //   }));
  // }

  const creditorKeyPress = async ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleCreditorBlur();
    }
  }

  useEffect(() => {
    async function fetchApi() {
      const accounts = await getAccounts();
      const categories = await getCategories();
      const creditors = await getCreditors();

      setAccounts(accounts);
      setCategories(categories);
      setCreditors(creditors);
    }

    fetchApi();
  }, []);

  return (
    <section id='finance-settings'>
      <div className='banner'>PlaceHolder</div>

      <section>
        <div className='column'>
          <div className='header'>
            <p></p>
            <h1>Creditors</h1>
            <p onClick={addNewCreditor}><DiffAddedIcon /></p>
          </div>

          {creditors && creditors.map(creditor => (
            <div className='row' key={creditor.name}>
              <h2>{creditor.name}</h2>
              <p
                className='x-button'
                onClick={() => delCreditor(creditor.name)}
              ></p>
            </div>
          ))}
        </div>
        <div className='column category'>
          <div className='header'>
            <h1>Categories</h1>
          </div>

          <div className='ie'>
            <div className='income'>
              <div className='top'>
                <p></p>
                <h2>Income</h2>
                <p onClick={() => addNewCategory('income')}><DiffAddedIcon /></p>
              </div>
              {categories && categories.filter(category => category.tag === 'income').map(category => (
                <div className='row' key={category.name}>
                  <h3>{category.name}</h3>
                  <p
                    className='x-button'
                    onClick={() => delCategory(category.name)}
                  ></p>
                </div>
              ))}
            </div>
            <div className='expense'>
              <div className='top'>
                <p></p>
                <h2>Expense</h2>
                <p onClick={() => addNewCategory('expense')}><DiffAddedIcon /></p>
              </div>
              {categories && categories.filter(category => category.tag === 'expense').map(category => (
                <div className='row' key={category.name}>
                  <h3>{category.name}</h3>
                  <p
                    className='x-button'
                    onClick={() => delCategory(category.name)}
                  ></p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='column'>
          <div className='header'>
            <p></p>
            <h1>Accounts</h1>
            <p onClick={addNewAccount}><DiffAddedIcon /></p>
          </div>

          {accounts && accounts.map(account => (
            <div className='row' key={account.name}>
              <h2>{account.name}</h2>
              <p
                className='x-button'
                onClick={() => delAccount(account.name)}
              ></p>
            </div>
          ))}
        </div>
      </section>

      <Link className='back-btn' to='/finance'>Back</Link>
      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default FinanceSettings;