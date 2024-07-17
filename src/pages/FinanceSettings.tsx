import React from 'react';
import { Link } from 'react-router-dom';

const FinanceSettings: React.FC = () => {
  return (
    <section id='finance-settings'>
      <div className='banner'>PlaceHolder</div>

      <section>
        <div>
          <h1>Creditors</h1>
        </div>
        <div>
          <h1>Categories</h1>
        </div>
        <div>
          <h1>Accounts</h1>
        </div>
      </section>

      <Link className='back-btn' to='/finance'>Back</Link>
      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default FinanceSettings;