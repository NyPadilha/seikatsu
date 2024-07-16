import React, { useEffect, useState, useContext } from 'react';
import {
  getSetupMetas, addSetupRow,
  getFinanceMetas, updateFinanceMeta,
  getMetas, addMeta,
  getGenericMetas,
  deleteGenericMeta
} from '../services/api';
import { SetupMetas, FinanceMeta, MetasType, GenericMeta } from '../types/IMetas';
import { CheckboxIcon, DiffAddedIcon } from '@primer/octicons-react';
import GenericMetaTable from '../components/metas/GenericMetaTable';
import CreateTableModal from '../components/metas/CreateTableModal';
import { MetasContext } from '../context/useContext';
import SetupMetaRow from '../components/metas/SetupMetaRow';
import MetasRow from '../components/metas/MetasRow';
import { Link } from 'react-router-dom'
import '../styles.scss'

const Metas: React.FC = () => {
  const [setupMetas, setSetupMetas] = useState<SetupMetas[]>([]);
  const [financeMeta, setFinanceMeta] = useState<FinanceMeta>();
  const [metas, setMetas] = useState<MetasType[]>([]);
  const [genericMetas, setGenericMetas] = useState<GenericMeta[]>([]);
  const [editingFinanceMeta, setEditingFinanceMeta] = useState<boolean>(false);
  const [newFinanceMeta, setNewFinanceMeta] = useState<string>(
    financeMeta ? financeMeta.value.toString() : '',
  );
  const { isCreateTableModalOpen, setIsCreateTableModalOpen } = useContext(MetasContext);

  const addNewSetupRow = async () => {
    const newItem = { item: 'New Item', value: 0, paid: 0, bought: false };
    await addSetupRow(newItem);
    setSetupMetas([...setupMetas, newItem]);
  }

  const handleDCFinanceMeta = () => {
    setEditingFinanceMeta(true);
  };

  const handleFinanceMetaChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setNewFinanceMeta(target.value);
  };

  const handleFinanceMetaBlur = async () => {
    setFinanceMeta({ value: parseFloat(newFinanceMeta) });
    setEditingFinanceMeta(false);
    await updateFinanceMeta({ value: parseFloat(newFinanceMeta) });
  };

  const handleKeyPressFinanceMeta = async ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleFinanceMetaBlur();
    }
  };

  const addNewMeta = async () => {
    const newMeta = { meta: 'New Meta', deadline: '00/00/0000', achieved: false };
    await addMeta(newMeta);
    setMetas([...metas, newMeta]);
  }

  const deleteGeneric = async (title: string) => {
    await deleteGenericMeta(title);
    setGenericMetas(genericMetas.filter((meta) => meta.title !== title));
  }

  useEffect(() => {
    async function fetchApi() {
      const setupMetas = await getSetupMetas();
      const financeMeta = await getFinanceMetas();
      const metas = await getMetas();
      const genericMetas = await getGenericMetas();

      const sortedMetas = metas.sort((a, b) => {
        const rearrangeDate = (date: string) => date.split('/').reverse().join('/');
        const aDate = rearrangeDate(a.deadline);
        const bDate = rearrangeDate(b.deadline);

        if (aDate < bDate) return -1;
        if (aDate > bDate) return 1;
        return 0;
      });

      setSetupMetas(setupMetas);
      setFinanceMeta(financeMeta);
      setNewFinanceMeta(financeMeta.value.toString());
      setMetas(sortedMetas);
      setGenericMetas(genericMetas);
    }

    fetchApi();
  }, []);


  return (
    <section id='metas'>
      <div className='banner'>PlaceHolder</div>

      {isCreateTableModalOpen && (
        <CreateTableModal onAdd={(meta) => setGenericMetas([...genericMetas, meta])} />
      )}
      <button
        className='create-table-btn'
        onClick={() => setIsCreateTableModalOpen(true)}
      >Create Table</button>

      <section className='first-section'>
        <div className='setup-metas'>
          <h1>Setup Metas</h1>
          <table>
            <thead>
              <tr>
                <th className='.item'>Item</th>
                <th className='value'>Value</th>
                <th className='paid'>Paid</th>
                <th className='difference'>Difference</th>
                <th className='bought'><CheckboxIcon /></th>
                <th className='delete' onClick={addNewSetupRow}><DiffAddedIcon /></th>
              </tr>
            </thead>
            <tbody>
              {setupMetas && setupMetas.map((meta) => (
                <SetupMetaRow
                  key={meta.item}
                  meta={meta}
                  onDelete={(item) => {
                    setSetupMetas(setupMetas.filter((meta) => meta.item !== item))
                  }}
                  onEdit={(item, value, paid, bought) => {
                    setSetupMetas(setupMetas.map((meta) => {
                      if (meta.item === item) {
                        return { item, value, paid, bought };
                      }
                      return meta;
                    }));
                  }}
                />
              ))}
            </tbody>
          </table>
          <div className='total-div'>
            <p className='total-p'>Total: </p>
            <p className='value-p'>R$ {setupMetas && setupMetas.reduce((acc, meta) => acc + meta.value, 0).toFixed(2)}</p>
            <p className='paid-p'>R$ {setupMetas && setupMetas.reduce((acc, meta) => acc + meta.paid, 0).toFixed(2)}</p>
            <p className='diff-p'>R$ {setupMetas && setupMetas.reduce((acc, meta) => acc + meta.value - meta.paid, 0).toFixed(2)}</p>
            <p className='bought-p'>{
              `${setupMetas ? setupMetas.reduce((acc, meta) => meta.bought ? acc + 1 : acc, 0) : 0}/${setupMetas ? setupMetas.length : 0}`
            }</p>
          </div>
        </div>

        <div className='metas'>
          <h1>Metas</h1>
          <table>
            <thead>
              <tr>
                <th>Meta</th>
                <th>Deadline</th>
                <th><CheckboxIcon /></th>
                <th onClick={addNewMeta}><DiffAddedIcon /></th>
              </tr>
            </thead>
            <tbody>
              {metas && metas.map((m) => (
                <MetasRow
                  key={m.meta}
                  meta={m}
                  onDelete={(meta) => {
                    setMetas(metas.filter((m) => m.meta !== meta))
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className='finance-meta'>
          <div>
            <h1>Finance Meta: </h1>
            {editingFinanceMeta ? (
              <input
                type="text"
                value={newFinanceMeta}
                onChange={handleFinanceMetaChange}
                onBlur={handleFinanceMetaBlur}
                onKeyDown={handleKeyPressFinanceMeta}
                autoFocus
              />
            ) : (
              <h2
                onDoubleClick={handleDCFinanceMeta}
              >R$ {financeMeta && financeMeta.value.toFixed(2)}</h2>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Metas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Renda Variavel | 40% Bull Bear</td>
                <td>R$ {financeMeta ? ((financeMeta.value - 5000) * 0.4).toFixed(2) : 0}</td>
              </tr>
              <tr>
                <td>Renda Variavel | 40% Top20 CDV</td>
                <td>R$ {financeMeta ? ((financeMeta.value - 5000) * 0.4).toFixed(2) : 0}</td>
              </tr>
              <tr>
                <td>Renda Variavel | 20% Top15 FII</td>
                <td>R$ {financeMeta ? ((financeMeta.value - 5000) * 0.2).toFixed(2) : 0}</td>
              </tr>
              <tr>
                <td>Reserva de Emergencia</td>
                <td>R$ 5000.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className='generic-section'>
        {genericMetas && genericMetas.map((meta) => (
          <div className='generic-table' key={meta.title}>
            <div>
              <p className='space'></p>
              <h1>{meta.title}</h1>
              <button
                className='x-button'
                onClick={() => deleteGeneric(meta.title)}
              ></button>
            </div>
            <GenericMetaTable meta={meta} />
          </div>
        ))}
      </section>

      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default Metas;