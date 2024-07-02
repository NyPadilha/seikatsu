import React, { useEffect, useState } from 'react';
// import { XCircleFillIcon, XIcon, CheckIcon } from '@primer/octicons-react';
import { GenericMeta } from '../../types/IMetas';
import GenericMetaRow from './GenericMetaRow';

interface GenericMetaTableProps {
  meta: GenericMeta;
}

const GenericMetaTable: React.FC<GenericMetaTableProps> = ({ meta }) => {
  const [columns, setColumns] = useState<string[]>([]);
  const [data, setData] = useState<string[][]>([]);

  useEffect(() => {
    setColumns(meta.columns);
    setData(meta.data);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <GenericMetaRow row={row} />
        ))}
      </tbody>
    </table>
  );
};

export default GenericMetaTable;