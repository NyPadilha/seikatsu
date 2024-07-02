import React, { useContext, useState } from 'react';
import { MetasContext } from '../../context/useContext';
import { GenericMeta } from '../../types/IMetas';
import '../../styles.scss';
import { addGenericMeta } from '../../services/api';

interface CreateTableModalProps {
  onAdd: (meta: GenericMeta) => void;
}

const CreateTableModal: React.FC<CreateTableModalProps> = ({ onAdd }) => {
  const { setIsCreateTableModalOpen } = useContext(MetasContext);
  const [meta, setMeta] = useState<GenericMeta>({ title: '', columns: [], data: [] });

  const handleAdd = async (meta: GenericMeta) => {
    await addGenericMeta(meta);
    onAdd(meta);
    setIsCreateTableModalOpen(false);
  }

  return (
    <div className='create-table-modal'>
      <button className='x-button' onClick={() => setIsCreateTableModalOpen(false)}></button>
      <h2>Create Table</h2>
      <form onSubmit={e => { e.preventDefault(); handleAdd(meta); }}>
        <input type='text' placeholder='Table Name' />

        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default CreateTableModal;