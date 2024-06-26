import React, { useEffect, useState } from 'react';
import { XCircleFillIcon, XIcon, CheckIcon } from '@primer/octicons-react';
import { deleteMeta, updateMeta, updateDeadline, updateAchieved } from '../../services/api';
import { MetasType } from '../../types/IMetas';

interface MetasRowProps {
  meta: MetasType;
  onDelete: (meta: string) => void;
}

const MetasRow: React.FC<MetasRowProps> = ({ meta, onDelete }) => {
  const [metaName, setMetaName] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [achieved, setAchieved] = useState<boolean>(false);
  const [tempMetaName, setTempMetaName] = useState<string>(metaName);
  const [editingMetaName, setEditingMetaName] = useState<boolean>(false);
  const [editingDeadline, setEditingDeadline] = useState<boolean>(false);

  const deleteRow = async (meta: string) => {
    await deleteMeta(meta);
    onDelete(meta);
  }

  const handleBlurMetaName = async () => {
    await updateMeta(metaName, tempMetaName);
    setEditingMetaName(false);
    setMetaName(tempMetaName);
  }

  const handleKeyPressMetaName = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleBlurMetaName();
    }
  }

  const handleBlurDeadline = async () => {
    await updateDeadline(metaName, deadline);
    setEditingDeadline(false);
  }

  const handleKeyPressDeadline = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleBlurDeadline();
    }
  }

  useEffect(() => {
    updateAchieved(metaName, achieved);
  }, [achieved]);

  useEffect(() => {
    setMetaName(meta.meta);
    setDeadline(meta.deadline);
    setAchieved(meta.achieved);
    setTempMetaName(meta.meta);
  }, []);

  return (
    <tr>
      <td
        className='meta'
        onDoubleClick={() => setEditingMetaName(true)}
      >{
          editingMetaName ? (
            <input
              className='meta-input'
              type='text'
              value={tempMetaName}
              onChange={({ target }) => setTempMetaName(target.value)}
              onBlur={handleBlurMetaName}
              onKeyDown={handleKeyPressMetaName}
            />
          ) : (
            metaName
          )
        }</td>
      <td
        className='deadline'
        onDoubleClick={() => setEditingDeadline(true)}
      >
        {editingDeadline ? (
          <input
            type='text'
            value={deadline}
            onChange={({ target }) => setDeadline(target.value)}
            onBlur={handleBlurDeadline}
            onKeyDown={handleKeyPressDeadline}
          />
        ) : (
          deadline
        )}
      </td>
      <td
        className='achieved'
        onClick={() => setAchieved(!achieved)}
      >{achieved ? <CheckIcon /> : <XIcon />}</td>
      <td className='delete' onClick={() => deleteRow(meta.meta)}>
        <XCircleFillIcon size={16} />
      </td>
    </tr>
  );
};

export default MetasRow;