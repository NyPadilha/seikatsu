import React from 'react';
import { Link } from 'react-router-dom';

const Debts: React.FC = () => {
  return (
    <section id='debts'>
      <div className='banner'>PlaceHolder</div>

      <div>Debts</div>

      <Link className='back-btn' to='/finance'>Back</Link>
      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default Debts;