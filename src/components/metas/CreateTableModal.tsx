import React, { useContext, useState } from 'react';
import { DiffAddedIcon, XCircleFillIcon } from '@primer/octicons-react';
import { MetasContext } from '../../context/useContext';
import { GenericMeta, Column, ColumnType } from '../../types/IMetas';
import '../../styles.scss';
import { addGenericMeta } from '../../services/api';

interface CreateTableModalProps {
  onAdd: (meta: GenericMeta) => void;
}

const CreateTableModal: React.FC<CreateTableModalProps> = ({ onAdd }) => {
  const { setIsCreateTableModalOpen } = useContext(MetasContext);
  const [meta, setMeta] = useState<GenericMeta>({ title: '', columns: [], data: [] });
  const [columns, setColumns] = useState<Column[]>([]);

  const handleAdd = async (meta: GenericMeta) => {
    meta.columns = columns;
    console.log(meta);
    // await addGenericMeta(meta);
    // onAdd(meta);
    // setIsCreateTableModalOpen(false);
  }

  return (
    <div className='create-table-modal'>
      <button className='x-button' onClick={() => setIsCreateTableModalOpen(false)}></button>
      <h3>- Create Table -</h3>
      <form onSubmit={e => { e.preventDefault(); handleAdd(meta); }}>
        <input type='text' placeholder='Title' value={meta.title} onChange={e => setMeta({ ...meta, title: e.target.value })} />
        <div className='header'>
          <h4>Columns</h4>
          <p onClick={() => setColumns([...columns, { name: "New Column", c_type: "string" }])}><DiffAddedIcon /></p>
        </div>
        <div className='rows'>
          {columns && columns.map((column, index) => (
            <div className='row' key={index}>
              <input type='text' value={column.name} onChange={e => {
                const newColumns = columns;
                newColumns[index].name = e.target.value;
                setColumns([...newColumns]);
              }} />
              <select onChange={e => {
                const newColumns = columns;
                newColumns[index].c_type = e.target.value as ColumnType;
                setColumns([...newColumns]);
              }}>
                <option value='string'>String</option>
                <option value='number'>Number</option>
                <option value='checkbox'>Checkbox</option>
                <option value='money'>Money</option>
              </select>
              <button
                onClick={() => {
                  const newColumns = columns;
                  newColumns.splice(index, 1);
                  setColumns([...newColumns]);
                }}
              ><XCircleFillIcon /></button>
            </div>
          ))}
        </div>
        <button className='submit-btn' type='submit'>Create</button>
      </form>
    </div>
  );
};

export default CreateTableModal;