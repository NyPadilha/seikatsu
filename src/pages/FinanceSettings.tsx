import React, { useEffect, useState } from 'react';
import { Account, CategoryTag, Category, Creditor } from '../types/IFinance';
import { addAccount, addCategory, addCreditor, getAccounts, getCategories, getCreditors } from '../services/api';
import { DiffAddedIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';
import CreditorRow from '../components/finance/SettingsCreditorRow';
import CategoryRow from '../components/finance/SettingsCategoryRow';
import AccountRow from '../components/finance/SettingsAccountRow';

const FinanceSettings: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [creditors, setCreditors] = useState<Creditor[]>([]);

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
            <CreditorRow
              key={creditor.name}
              creditor={creditor}
              onDelete={(name) =>
                setCreditors(creditors.filter(creditor => creditor.name !== name))
              }
            />
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
                <CategoryRow
                  key={category.name}
                  category={category}
                  onDelete={(name) =>
                    setCategories(categories.filter(category => category.name !== name))
                  }
                />
              ))}
            </div>
            <div className='expense'>
              <div className='top'>
                <p></p>
                <h2>Expense</h2>
                <p onClick={() => addNewCategory('expense')}><DiffAddedIcon /></p>
              </div>
              {categories && categories.filter(category => category.tag === 'expense').map(category => (
                <CategoryRow
                  key={category.name}
                  category={category}
                  onDelete={(name) =>
                    setCategories(categories.filter(category => category.name !== name))
                  }
                />
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
            <AccountRow
              key={account.name}
              account={account}
              onDelete={(name) =>
                setAccounts(accounts.filter(account => account.name !== name))
              }
            />
          ))}
        </div>
      </section>

      <Link className='back-btn' to='/finance'>Back</Link>
      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default FinanceSettings;