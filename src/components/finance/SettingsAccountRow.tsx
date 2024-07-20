import React, { useEffect, useState } from 'react';
import { deleteAccount, updateAccountName, updateAccountTag } from '../../services/api';
import { Account, AccountTag } from '../../types/IFinance';

interface AccountRowProps {
  account: Account;
  onDelete: (name: string) => void;
}

const AccountRow: React.FC<AccountRowProps> = ({ account, onDelete }) => {
  const [accountName, setAccountName] = useState<string>('');
  const [accountTag, setAccountTag] = useState<AccountTag>('bank');
  const [isEditingAccount, setIsEditingAccount] = useState<boolean>(false);
  const [isEditingTag, setIsEditingTag] = useState<boolean>(false);

  const deleteRow = async () => {
    await deleteAccount(accountName);
    onDelete(accountName);
  }

  const handleAccountBlur = async () => {
    setIsEditingAccount(false);
    await updateAccountName(account.name, accountName);
  }

  const accountKeyPress = async ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleAccountBlur();
    }
  }

  const handleAccountTagChange = async (tag: AccountTag) => {
    setAccountTag(tag);
    await updateAccountTag(accountName, tag);
  }

  useEffect(() => {
    setAccountName(account.name);
    setAccountTag(account.tag);
  }, []);

  return (
    <div className='row'>
      {isEditingAccount ? (
        <input
          type='text'
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          onBlur={handleAccountBlur}
          onKeyDown={accountKeyPress}
          autoFocus
        />
      ) : (
        <h2
          onDoubleClick={() => setIsEditingAccount(true)}
        >
          {accountName}
        </h2>
      )}
      <h3
        onClick={() => setIsEditingTag(true)}
        className={isEditingTag ? 'clicked' : ''}
      >- {accountTag} -</h3>
      {isEditingTag && (
        <div className='tag-options'>
          <p
            onClick={() => {
              handleAccountTagChange('cash');
              setIsEditingTag(false);
            }
            }
          >Cash</p>
          <p
            onClick={() => {
              handleAccountTagChange('bank');
              setIsEditingTag(false);
            }
            }
          >Bank</p>
          <p
            onClick={() => {
              handleAccountTagChange('credit');
              setIsEditingTag(false);
            }
            }
          >Credit</p>
        </div>
      )}
      <p
        className='x-button'
        onClick={deleteRow}
      ></p>
    </div>
  );
};

export default AccountRow;