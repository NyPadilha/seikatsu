import React, { useEffect, useState } from 'react';
import { getWorkouts } from '../services/api';
import { Exercise, Workout } from '../types/ITraining';
import { Link } from 'react-router-dom';
import '../styles.scss';
import WorkoutTable from '../components/training/WorkoutTable';

const Training: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const data = await getWorkouts() as Workout[];
      setWorkouts(data);
    };
    fetchWorkouts();
  }, []);

  return (
    <section id='training'>
      <div className='banner'>PlaceHolder</div>

      <div>Training</div>
      <button>Create Workout</button>
      <div className='workouts'>
        {workouts.map((workout) => (
          <WorkoutTable key={workout.title} workout={workout} />
        ))}
      </div>
      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default Training;