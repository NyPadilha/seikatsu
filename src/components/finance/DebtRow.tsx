import React, { useEffect, useState } from 'react';
import { Debt } from '../../types/IFinance';
import { XCircleFillIcon } from '@primer/octicons-react';
import { deleteDebt } from '../../services/api';

interface DebtProps {
  debt: Debt;
  onDelete: (debt: Debt) => void;
}

const DebtRow: React.FC<DebtProps> = ({ debt, onDelete }) => {
  const [creditor, setCreditor] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [cet, setCet] = useState<number>(0);
  const [monthlyInstallment, setMonthlyInstallment] = useState<number>(0);
  const [outstandingInstallments, setOutstandingInstallments] = useState<number>(0);

  const delDebt = async (id: number) => {
    await deleteDebt(id);
    onDelete(debt);
  }

  useEffect(() => {
    setCreditor(debt.creditor);
    setValue(debt.value);
    setDescription(debt.description);
    setCet(debt.cet);
    setMonthlyInstallment(debt.monthly_installment);
    setOutstandingInstallments(debt.outstanding_installments);
  }, []);

  return (
    <div>
      <h2 className='creditor'>{creditor}</h2>
      <h2 className='value'>{value}</h2>
      <h2 className='description'>{description}</h2>
      <h2 className='cet'>{cet}</h2>
      <h2 className='monthly-payment'>{monthlyInstallment}</h2>
      <h2 className='outstanding-installments'>{outstandingInstallments}</h2>
      <h2 className='delete' onClick={() => delDebt(debt.id)}><XCircleFillIcon /></h2>
    </div>
  );
};

export default DebtRow;