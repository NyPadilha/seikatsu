import React from 'react';
import { Link } from 'react-router-dom';

const Investments: React.FC = () => {
  return (
    <section>
      <div className='banner'>PlaceHolder</div>

      <div>Investments</div>
      <Link to='/finance'>Back</Link>
    </section>
  );
};

export default Investments;