import React, { useEffect, useState } from 'react';
import { CheckCircleFillIcon, XCircleFillIcon, DiffRemovedIcon } from '@primer/octicons-react';
import { deleteSetupRow, updateSetupRow } from '../../services/api';
import { SetupMetas } from '../../types/IMetas';

interface SetupMetaRowProps {
  meta: SetupMetas;
  onDelete: (item: string) => void;
  // onEdit: (item: string, value: number, paid: number, bought: boolean) => void;
}

const SetupMetaRow: React.FC<SetupMetaRowProps> = ({ meta, onDelete }) => {
  const [item, setItem] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [paid, setPaid] = useState<number>(0);
  const [bought, setBought] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<number | null>(null);
  const [editingPaid, setEditingPaid] = useState<number | null>(null);

  const updateSetupR = async (item: string, value: number, paid: number, bought: boolean) => {
    console.log(bought);
    await updateSetupRow(item, value, paid, bought);
    console.log(bought);
  }

  const delSetupRow = async (item: string) => {
    onDelete(item);
  }

  useEffect(() => {
    setItem(meta.item);
    setValue(meta.value);
    setPaid(meta.paid);
    setBought(meta.bought);
    console.log(bought);
  }, []);

  return (
    <tr>
      <td
      // onDoubleClick={() => handleDCSetupItem(meta.item)}
      >{item}</td>
      <td
      // onDoubleClick={() => handleDCSetupValue(meta.item)}
      >{value}</td>
      <td
      >{paid}</td>
      <td
        onClick={() => {
          console.log(bought)
          setBought(!bought)
          updateSetupR(item, value, paid, bought)
        }}
      >{bought ? <CheckCircleFillIcon /> : <XCircleFillIcon />}</td>
      <td
        onClick={() => delSetupRow(meta.item)}
      ><DiffRemovedIcon /></td>
    </tr>
  );
};

export default SetupMetaRow;