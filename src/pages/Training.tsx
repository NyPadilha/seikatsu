import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Training: React.FC = () => {
  const [workouts, setWorkouts] = useState([]);

  return (
    <section id='training'>
      <div className='banner'>PlaceHolder</div>

      <div>Training</div>
      <button>Create Workout</button>
      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default Training;