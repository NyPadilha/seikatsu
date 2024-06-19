import React, { useEffect, useState, useContext } from 'react';
import WorkoutTable from '../components/training/WorkoutTable';
import NewWorkoutModal from '../components/training/NewWorkoutModal';
import { TrainingContext } from '../context/useContext';
import { getWorkouts } from '../services/api';
import { Workout } from '../types/ITraining';
import { Link } from 'react-router-dom';
import '../styles.scss';

const Training: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { isNewWorkoutModalOpen, setIsNewWorkoutModalOpen } = useContext(TrainingContext);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const data = await getWorkouts() as Workout[];
      data && setWorkouts(data);
    };
    fetchWorkouts();
  }, []);

  return (
    <section id='training'>
      <div className='banner'>PlaceHolder</div>
      {isNewWorkoutModalOpen && <NewWorkoutModal onAdd={(workout) => setWorkouts([...workouts, workout])} />}
      <button className='new-workout-btn' onClick={() => setIsNewWorkoutModalOpen(true)}>Create Workout</button>
      <br />
      <br />
      <div className='workouts'>
        {workouts.map((workout) => (
          <WorkoutTable
            key={workout.title}
            workout={workout}
            onDelete={() => setWorkouts(workouts.filter((w) => w.title !== workout.title))}
          />
        ))}
      </div>
      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default Training;