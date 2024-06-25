import React, { useEffect, useState } from 'react';
import {
  getSetupMetas, addSetupRow,
  getFinanceMetas, updateFinanceMeta,
  getMetas,
  getGenericMetas
} from '../services/api';
import { CheckboxIcon, DiffAddedIcon } from '@primer/octicons-react';
import { SetupMetas, FinanceMeta, MetasType, GenericMeta } from '../types/IMetas';
import { Link } from 'react-router-dom'
import '../styles.scss'
import SetupMetaRow from '../components/metas/SetupMetaRow';

const Metas: React.FC = () => {
  const [setupMetas, setSetupMetas] = useState<SetupMetas[]>([]);
  const [financeMeta, setFinanceMeta] = useState<FinanceMeta>();
  const [/*metas*/, setMetas] = useState<MetasType[]>([]);
  const [/*genericMetas*/, setGenericMetas] = useState<GenericMeta[]>([]);
  const [editingFinanceMeta, setEditingFinanceMeta] = useState<boolean>(false);
  const [newFinanceMeta, setNewFinanceMeta] = useState<string>(
    financeMeta ? financeMeta.value.toString() : '',
  );

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

  useEffect(() => {
    async function fetchApi() {
      const setupMetas = await getSetupMetas();
      const financeMeta = await getFinanceMetas();
      const metas = await getMetas();
      const genericMetas = await getGenericMetas();

      setSetupMetas(setupMetas);
      setFinanceMeta(financeMeta);
      setMetas(metas);
      setGenericMetas(genericMetas);
    }

    fetchApi();
  }, []);


  return (
    <section id='metas'>
      <div className='banner'>PlaceHolder</div>

      <div className='setup-metas'>
        <h1>Setup Metas</h1>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Value</th>
              <th>Paid</th>
              <th>Difference</th>
              <th><CheckboxIcon /></th>
              <th onClick={addNewSetupRow}><DiffAddedIcon /></th>
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
          <p className='value-p'>R$ {setupMetas.reduce((acc, meta) => acc + meta.value, 0).toFixed(2)}</p>
          <p className='paid-p'>R$ {setupMetas.reduce((acc, meta) => acc + meta.paid, 0).toFixed(2)}</p>
          <p className='diff-p'>R$ {setupMetas.reduce((acc, meta) => acc + meta.value - meta.paid, 0).toFixed(2)}</p>
          <p className='bought-p'>{`${setupMetas.reduce((acc, meta) => meta.bought ? acc + 1 : acc, 0)}/${setupMetas.length}`}</p>
        </div>
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
            >R$ {financeMeta && financeMeta.value}</h2>
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

      <h1>Metas</h1>
      // implement metas table

      <h1>Generic Metas</h1>
      // implement generic metas table


      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default Metas;