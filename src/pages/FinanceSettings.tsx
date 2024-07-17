import React from 'react';
import { Link } from 'react-router-dom';

const FinanceSettings: React.FC = () => {
  return (
    <section>
      <div className='banner'>PlaceHolder</div>

      <div>Finance Settings</div>
      <Link to='/finance'>Back</Link>
    </section>
  );
};

export default FinanceSettings;