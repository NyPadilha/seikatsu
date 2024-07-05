import React, { useEffect, useState } from 'react';
// import { XCircleFillIcon, XIcon, CheckIcon } from '@primer/octicons-react';
import { GenericMeta, Column, ColumnType } from '../../types/IMetas';
import GenericMetaRow from './GenericMetaRow';

interface GenericMetaTableProps {
  meta: GenericMeta;
}

const GenericMetaTable: React.FC<GenericMetaTableProps> = ({ meta }) => {
  const [columns, setColumns] = useState<string[]>([]);
  const [data, setData] = useState<string[][]>([]);
  const [dataTypes, setDataTypes] = useState<ColumnType[]>([]);

  useEffect(() => {
    setColumns(meta.columns.map((column) => column.name));
    setData(meta.data);
    setDataTypes(meta.columns.map((column) => column.c_type));
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
          <GenericMetaRow row={row} dataTypes={dataTypes} />
        ))}
      </tbody>
    </table>
  );
};

export default GenericMetaTable;