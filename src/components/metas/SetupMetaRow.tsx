import React, { useEffect, useState } from 'react';
import { CheckCircleFillIcon, XCircleFillIcon, DiffRemovedIcon } from '@primer/octicons-react';
import { deleteSetupRow, updateSetupRow } from '../../services/api';
import { SetupMetas } from '../../types/IMetas';

interface SetupMetaRowProps {
  meta: SetupMetas;
  onDelete: (item: string) => void;
}

const SetupMetaRow: React.FC<SetupMetaRowProps> = ({ meta, onDelete }) => {
  const [item, setItem] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [paid, setPaid] = useState<number>(0);
  const [bought, setBought] = useState<boolean>(false);

  const delSetupRow = async (item: string) => {
    await deleteSetupRow(item)
    onDelete(item);
  }

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
      <td
      // onDoubleClick={}
      >{item}</td>
      <td
      // onDoubleClick={}
      >{value}</td>
      <td
      // onDoubleClick={}
      >{paid}</td>
      <td
        onClick={() => setBought(!bought)}
      >{bought ? <CheckCircleFillIcon /> : <XCircleFillIcon />}</td>
      <td
        onClick={() => delSetupRow(meta.item)}
      ><DiffRemovedIcon /></td>
    </tr>
  );
};

export default SetupMetaRow;