import React from 'react';
import { Link } from 'react-router-dom';

const Debts: React.FC = () => {
  return (
    <section>
      <div className='banner'>PlaceHolder</div>

      <div>Debts</div>
      <Link to='/finance'>Back</Link>
    </section>
  );
};

export default Debts;