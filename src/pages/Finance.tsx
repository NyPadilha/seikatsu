import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Account, Debt } from '../types/IFinance';
import { getAccounts, getDebts } from '../services/api';

const Finance: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);

  const cash: string | number = accounts.find(account => account.tag === 'cash')?.balance || 0;
  const checking: string | number = accounts.reduce((acc, account) => account.tag === 'bank' ? acc + account.balance : acc, 0);

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
        <Link className='btn' to='/transactions'>Transactions</Link>
        <Link className='btn' to='/cashflow'>Cash Flow</Link>
        <Link className='btn' to='/investments'>Investments</Link>
        <Link className='btn' to='/debts'>Debts</Link>
        <Link className='btn' to='/finance-settings'>Settings</Link>
      </div>

      <div className='balance-sheet'>
        <div>
          <div className='assets'>
            <div className='total-assets'>
              <h3>Total Assets</h3>
              <p>{ }</p>
            </div>
            <div className='current-assets'>
              <table>
                <thead>
                  <tr>
                    <th>Current Assets</th>
                    <th>{(cash + checking).toFixed(2)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Cash</td>
                    <td>{cash == 0 ? "" : cash.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Checking Account</td>
                    <td>{checking == 0 ? "" : checking.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='investments'>
              <table>
                <thead>
                  <tr>
                    <th>Investments</th>
                    <th>{ }</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
            <div className='other-personal-assets'>
              <table>
                <thead>
                  <tr>
                    <th>Other Personal Assets</th>
                    <th>{ }</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
          <div className='liabilities'>
            <div className='total-liabilities'>
              <h3>Total Liabilities</h3>
              <p>{ }</p>
            </div>
            <div className='current-liabilities'>
              <table>
                <thead>
                  <tr>
                    <th>Current Liabilities</th>
                    <th>{ }</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
            <div className='non-current-liabilities'>
              <table>
                <thead>
                  <tr>
                    <th>Non Current Liabilities</th>
                    <th>{ }</th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
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