import React, { useEffect, useState } from 'react';
import { CheckboxIcon, DiffAddedIcon, XCircleFillIcon } from '@primer/octicons-react';
import { GenericMeta, Column, ColumnType } from '../../types/IMetas';
import GenericMetaRow from './GenericMetaRow';
import { addRowGenericMeta, deleteRowGenericMeta, updateRowGenericMeta } from '../../services/api';

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
    await deleteRowGenericMeta(meta.title, row)
    const newData = data.filter((r) => r !== row);
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
        {
          data.map((row) => (
            <tr key={`${row[0]}`}>
              {row.map((d, index) => (
                <GenericMetaRow
                  key={index}
                  data={d}
                  dataType={dataTypes[index]}
                  updateData={(rowD) => {
                    const oldId = row[0];
                    const newData = row[index] = rowD;
                    let newRow = row;
                    newRow[index] = newData;
                    updateRowGenericMeta(meta.title, oldId, newRow);
                  }}
                />
              ))}
              <td onClick={() => deleteRow(row)}><XCircleFillIcon /></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default GenericMetaTable;