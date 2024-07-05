import React, { useEffect, useState } from 'react';
import { XCircleFillIcon, XIcon, CheckIcon } from '@primer/octicons-react';
// import { GenericMeta } from '../../types/IMetas';

interface GenericMetaRowProps {
  row: string[];
  dataTypes: string[];
  onDelete: (row: string[]) => void;
}

const GenericMetaRow: React.FC<GenericMetaRowProps> = ({ row, dataTypes, onDelete }) => {
  const [thisRow, setThisRow] = useState<string[]>([]);

  useEffect(() => {
    setThisRow(row);
  }, []);

  return (
    <tr>
      {thisRow.map((r, index) => (
        <td key={index}>
          {dataTypes[index] === 'checkbox' && (r === 'true' ? <CheckIcon /> : <XIcon />)}
          {dataTypes[index] === 'money' && `R$ ${r}`}
          {(['number', 'string'].includes(dataTypes[index])) && r}
        </td>
      ))}
      <td onClick={() => onDelete(thisRow)}><XCircleFillIcon /></td>
    </tr>
  );
};

export default GenericMetaRow;