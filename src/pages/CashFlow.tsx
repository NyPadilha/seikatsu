import React from 'react';
import { Link } from 'react-router-dom';

const CashFlow: React.FC = () => {
  return (
    <section id='cash-flow'>
      <div className='banner'>PlaceHolder</div>

      <div>Cash Flow</div>

      <Link className='back-btn' to='/finance'>Back</Link>
      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default CashFlow;