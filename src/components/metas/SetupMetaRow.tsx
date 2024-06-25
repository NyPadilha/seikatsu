import React, { useEffect, useState } from 'react';
import { XCircleFillIcon, XIcon, CheckIcon } from '@primer/octicons-react';
import { deleteSetupRow, updateSetupRow, updateSetupItem } from '../../services/api';
import { SetupMetas } from '../../types/IMetas';

interface SetupMetaRowProps {
  meta: SetupMetas;
  onDelete: (item: string) => void;
  onEdit: (item: string, value: number, paid: number, bought: boolean) => void;
}

const SetupMetaRow: React.FC<SetupMetaRowProps> = ({ meta, onDelete, onEdit }) => {
  const [item, setItem] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [paid, setPaid] = useState<number>(0);
  const [bought, setBought] = useState<boolean>(false);
  const [tempItem, setTempItem] = useState<string>(item);
  const [editingItem, setEditingItem] = useState<boolean>(false);
  const [editingValue, setEditingValue] = useState<boolean>(false);
  const [editingPaid, setEditingPaid] = useState<boolean>(false);

  const delSetupRow = async (item: string) => {
    await deleteSetupRow(item)
    onDelete(item);
  }

  const handleBlurItem = async () => {
    await updateSetupItem(item, tempItem);
    setEditingItem(false);
    setItem(tempItem);
  }

  const handleKeyPressItem = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleBlurItem();
    }
  }

  const handleBlurValue = async () => {
    await updateSetupRow(item, value, paid, bought);
    setEditingValue(false);
  }

  const handleKeyPressValue = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleBlurValue();
    }
  }

  const handleBlurPaid = async () => {
    await updateSetupRow(item, value, paid, bought);
    setEditingPaid(false);
  }

  const handleKeyPressPaid = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleBlurPaid();
    }
  }

  useEffect(() => {
    onEdit(item, value, paid, bought);
  }, [item, value, paid, bought]);

  useEffect(() => {
    updateSetupRow(item, value, paid, bought);
  }, [bought]);

  useEffect(() => {
    setItem(meta.item);
    setValue(meta.value);
    setPaid(meta.paid);
    setBought(meta.bought);
  }, []);

  return (
    <tr>
      <td className='item' onDoubleClick={() => setEditingItem(true)}>
        {editingItem ? (
          <input
            type="text"
            value={tempItem}
            onChange={({ target }) => setTempItem(target.value)}
            onBlur={handleBlurItem}
            onKeyDown={handleKeyPressItem}
            autoFocus
          />
        ) : (
          item
        )}
      </td>
      <td className='value' onDoubleClick={() => setEditingValue(true)}>
        {editingValue ? (
          <input
            type="text"
            value={value}
            onChange={({ target }) => setValue(parseFloat(target.value))}
            onBlur={handleBlurValue}
            onKeyDown={handleKeyPressValue}
            autoFocus
          />
        ) : (
          `R$ ${value.toFixed(2)}`
        )}
      </td>
      <td className='paid' onDoubleClick={() => setEditingPaid(true)}>
        {editingPaid ? (
          <input
            type="text"
            value={paid}
            onChange={({ target }) => setPaid(parseFloat(target.value))}
            onBlur={handleBlurPaid}
            onKeyDown={handleKeyPressPaid}
            autoFocus
          />
        ) : (
          `R$ ${paid.toFixed(2)}`
        )}
      </td>
      <td className='difference'>R$ {(value - paid).toFixed(2)}</td>
      <td
        className='bought'
        onClick={() => setBought(!bought)}
      >{bought ? <CheckIcon /> : <XIcon />}</td>
      <td
        className='delete'
        onClick={() => delSetupRow(meta.item)}
      ><XCircleFillIcon /></td>
    </tr>
  );
};

export default SetupMetaRow;