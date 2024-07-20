import React, { useEffect, useState } from 'react';
import { deleteCreditor, updateCreditorName } from '../../services/api';
import { Creditor } from '../../types/IFinance';

interface CreditorRowProps {
  creditor: Creditor;
  onDelete: (name: string) => void;
}

const CreditorRow: React.FC<CreditorRowProps> = ({ creditor, onDelete }) => {
  const [creditorName, setCreditorName] = useState<string>('');
  const [isEditingCreditor, setIsEditingCreditor] = useState<boolean>(false);

  const deleteRow = async () => {
    await deleteCreditor(creditorName);
    onDelete(creditorName);
  }

  const handleCreditorBlur = async () => {
    setIsEditingCreditor(false);
    await updateCreditorName(creditor.name, creditorName);
  }

  const creditorKeyPress = async ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleCreditorBlur();
    }
  }

  useEffect(() => {
    setCreditorName(creditor.name);
  }, []);

  return (
    <div className='row'>
      {isEditingCreditor ? (
        <input
          type='text'
          value={creditorName}
          onChange={(e) => setCreditorName(e.target.value)}
          onBlur={handleCreditorBlur}
          onKeyDown={creditorKeyPress}
          autoFocus
        />
      ) : (
        <h2
          onDoubleClick={() => setIsEditingCreditor(true)}
        >
          {creditorName}
        </h2>
      )}
      <p
        className='x-button'
        onClick={deleteRow}
      ></p>
    </div>
  );
};

export default CreditorRow;