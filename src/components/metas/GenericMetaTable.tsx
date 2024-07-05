import React, { useEffect, useState } from 'react';
import { CheckboxIcon, DiffAddedIcon } from '@primer/octicons-react';
import { GenericMeta, Column, ColumnType } from '../../types/IMetas';
import GenericMetaRow from './GenericMetaRow';
import { addRowGenericMeta, deleteRowGenericMeta } from '../../services/api';

interface GenericMetaTableProps {
  meta: GenericMeta;
}

const GenericMetaTable: React.FC<GenericMetaTableProps> = ({ meta }) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<string[][]>([]);
  const [dataTypes, setDataTypes] = useState<ColumnType[]>([]);

  const addNewRow = async () => {
    const row: string[] = columns.map((column) => column.c_type === 'checkbox' ? 'false' : '');
    row[0] = 'New Row';
    await addRowGenericMeta(meta.title, row);
    setData([...data, row]);
  }

  const deleteRow = async (row: string[]) => {
    const newData = data.filter((r) => r !== row);
    await deleteRowGenericMeta(meta.title, row)
    setData(newData);
  }

  useEffect(() => {
    setColumns(meta.columns);
    setData(meta.data);
    setDataTypes(meta.columns.map((column) => column.c_type));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            column.c_type === 'checkbox' ? <th key={column.name}><CheckboxIcon /></th>
              : <th key={column.name}>{column.name}</th>
          ))}
          <th onClick={addNewRow}><DiffAddedIcon /></th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <GenericMetaRow
            key={row[0]}
            row={row}
            dataTypes={dataTypes}
            onDelete={(row) => deleteRow(row)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default GenericMetaTable;