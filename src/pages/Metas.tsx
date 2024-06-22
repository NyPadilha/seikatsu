import React, { useEffect, useState } from 'react';
import { getSetupMetas, getFinanceMetas, getMetas, getGenericMetas } from '../services/api';
import { SetupMetas, FinanceMeta, MetasType, GenericMeta } from '../types/IMetas';
import { Link } from 'react-router-dom'
import '../styles.scss'

const Metas: React.FC = () => {
  const [setupMetas, setSetupMetas] = useState<SetupMetas[]>([]);
  const [financeMeta, setFinanceMeta] = useState<FinanceMeta>();
  const [/*metas*/, setMetas] = useState<MetasType[]>([]);
  const [/*genericMetas*/, setGenericMetas] = useState<GenericMeta[]>([]);

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

      // implement edit/add/delete row functions
      <h1>Setup Metas</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Value</th>
            <th>Paid</th>
            <th>CheckIcon</th>
          </tr>
        </thead>
        <tbody>
          {setupMetas.map((meta) => (
            <tr key={meta.item}>
              <td>{meta.item}</td>
              <td>{meta.value}</td>
              <td>{meta.paid}</td>
              <td>{meta.bought ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Finance Meta</h1>
      {<h1>{financeMeta && financeMeta.value}</h1>}
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
            <td>{financeMeta ? `R$ ${parseFloat(((financeMeta.value - 5000) * 0.4).toFixed(2))}` : 0}</td>
          </tr>
          <tr>
            <td>Renda Variavel | 40% Top20 CDV</td>
            <td>{financeMeta ? `R$ ${parseFloat(((financeMeta.value - 5000) * 0.4).toFixed(2))}` : 0}</td>
          </tr>
          <tr>
            <td>Renda Variavel | 20% Top15 FII</td>
            <td>{financeMeta ? `R$ ${parseFloat(((financeMeta.value - 5000) * 0.2).toFixed(2))}` : 0}</td>
          </tr>
          <tr>
            <td>Reserva de Emergencia</td>
            <td>R$ 5000.00</td>
          </tr>
        </tbody>
      </table>

      <h1>Metas</h1>
      // implement metas table

      <h1>Generic Metas</h1>
      // implement generic metas table


      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default Metas;