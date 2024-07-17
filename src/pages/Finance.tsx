import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Account, Debt } from '../types/IFinance';
import { getAccounts, getDebts } from '../services/api';

const Finance: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [/*debts*/, setDebts] = useState<Debt[]>([]);

  useEffect(() => {
    async function fetchApi() {
      const accounts = await getAccounts();
      const debts = await getDebts();

      setAccounts(accounts);
      setDebts(debts);
    }

    fetchApi();
  }, []);

  return (
    <section id='finance'>
      <div className='banner'>PlaceHolder</div>

      <div className='buttons'>
        <button>Transactions</button>
        <button>Cash Flow</button>
        <button>Investments</button>
        <button>Debts</button>
        <button>Settings</button>
      </div>

      <div className='balance-sheet'>
        <div>
          <div className='assets'>
            <div className='total-assets'>
              <h3>Total Assets</h3>
              <p>{ }</p>
            </div>
            <div className='current-assets'>
              <p>cash</p>
              <p>{accounts.find(account => account.tag === 'cash')?.balance || 0}</p>
              <p>checking account</p>
              <p>{accounts.reduce((acc, account) => account.tag === 'bank' ? acc + account.balance : acc, 0)}</p>
            </div>
            <div className='investments'>

            </div>
            <div className='other-personal-assets'>

            </div>
          </div>
          <div className='liabilities'>
            <div className='total-liabilities'>
              <h3>Total Liabilities</h3>
              <p>{ }</p>
            </div>
            <div className='current-liabilities'>

            </div>
            <div className='non-current-liabilities'>

            </div>
          </div>
        </div>
        <div className='total'></div>
      </div>

      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default Finance;