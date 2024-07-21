import React from 'react';
import { Link } from 'react-router-dom';

const Investments: React.FC = () => {
  return (
    <section id='investments'>
      <div className='banner'>PlaceHolder</div>

      <div>Investments</div>

      <Link className='back-btn' to='/finance'>Back</Link>
      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default Investments;