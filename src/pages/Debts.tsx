import React, { useEffect, useState } from 'react';
import { DiffAddedIcon } from '@primer/octicons-react';
import { addDebt, getDebts } from '../services/api';
import { Debt } from '../types/IFinance';
import { Link } from 'react-router-dom';
import DebtRow from '../components/finance/DebtRow';

const Debts: React.FC = () => {
  const [debts, setDebts] = useState<Debt[]>([]);

  const addNewDebt = async () => {
    const newDebt = {
      id: debts.length ? debts[debts.length - 1].id + 1 : 1,
      creditor: '',
      value: 0,
      description: '',
      cet: 0,
      monthly_installment: 0,
      outstanding_installments: 0,
    };
    await addDebt(newDebt);
    setDebts([...debts, newDebt]);
  };

  useEffect(() => {
    async function fetchApi() {
      const debts = await getDebts();
      setDebts(debts);
    }

    fetchApi();
  }, []);

  return (
    <section id='debts'>
      <div className='banner'>PlaceHolder</div>

      <div className='columns'>
        <h1 className='creditor'>Creditor</h1>
        <h1 className='value'>Value</h1>
        <h1 className='description'>Description</h1>
        <h1 className='cet'>CET</h1>
        <h1 className='monthly-payment'>Monthly Payment</h1>
        <h1 className='outstanding-installments'>Outstanding Installments</h1>
        <h1 className='add' onClick={addNewDebt}><DiffAddedIcon /></h1>
      </div>
      <section>
        {debts.map(debt => (
          <DebtRow
            key={debt.id}
            debt={debt}
            onDelete={(debt) => {
              setDebts(debts.filter(d => d.id !== debt.id));
            }}
          />
        ))}
      </section>

      <Link className='back-btn' to='/finance'>Back</Link>
      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default Debts;