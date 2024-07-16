import React, { useEffect, useState } from 'react';
import { XIcon, CheckIcon } from '@primer/octicons-react';
// import { DataType } from '../../types/IMetas';

interface GenericMetaRowProps {
  data: string;
  index: number;
  dataType: string;
  updateData: (data: string) => void;
}

const GenericMetaRow: React.FC<GenericMetaRowProps> = ({ data, index, dataType, updateData }) => {
  const [rowD, setRowD] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [tempRowD, setTempRowD] = useState<string>(rowD);

  const dataFormatter = (data: string, type: string) => {
    if (type === 'checkbox') {
      return data === 'true' ? <CheckIcon /> : <XIcon />;
    }
    if (type === 'money') {
      return `R$ ${data}`;
    }
    return data;
  }

  const handleBlur = async () => {
    updateData(tempRowD);
    setEditing(false);
    setRowD(tempRowD);
  }

  const handleKeyPress = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleBlur();
    }
  }

  const updateCheckpoint = () => {
    const newData = rowD === 'true' ? 'false' : 'true';
    updateData(newData);
    setRowD(newData);
  }

  useEffect(() => {
    setRowD(data);
    setTempRowD(data);
  }, []);

  return (
    <td
      className={index === 0 ? `first-column ${dataType}` : dataType}
      onClick={() => {
        dataType === 'checkbox' && updateCheckpoint();
      }}
      onDoubleClick={() => dataType !== 'checkbox' && setEditing(true)}
    >
      {editing ? (
        <input
          type={dataType === 'money' ? 'number' : 'text'}
          value={tempRowD}
          onChange={({ target }) => setTempRowD(target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      ) :
        dataFormatter(rowD, dataType)}
    </td>
  );
};

export default GenericMetaRow;