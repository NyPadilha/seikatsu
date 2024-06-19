import React from 'react';
import { Link } from 'react-router-dom'
import '../styles.scss'

const Metas: React.FC = () => {
  return (
    <section id='metas'>
      <div className='banner'>PlaceHolder</div>

      <div>Metas</div>
      <Link to='/'>Home</Link>
    </section>
  );
};

export default Metas;