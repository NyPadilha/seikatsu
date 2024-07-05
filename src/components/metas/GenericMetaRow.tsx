import React, { useEffect, useState } from 'react';
// import { XCircleFillIcon, XIcon, CheckIcon } from '@primer/octicons-react';
// import { GenericMeta } from '../../types/IMetas';

interface GenericMetaRowProps {
  row: string[];
  dataTypes: string[];
}

const GenericMetaRow: React.FC<GenericMetaRowProps> = ({ row }) => {
  const [rows, setRows] = useState<string[]>([]);

  useEffect(() => {
    setRows(row);
  }, []);

  return (
    <tr>
      {rows.map((r, index) => (
        <td key={r}>
          {r}
        </td>
      ))}
    </tr>
  );
};

export default GenericMetaRow;