import React from 'react';
import { Exercise, Workout, Tag } from '../../types/ITraining';
import { deleteWorkout } from '../../services/api';

interface WorkoutTableProps {
  workout: Workout;
  onDelete: () => void;
}

const WorkoutTable: React.FC<WorkoutTableProps> = ({ workout, onDelete }) => {
  const handleDelete = async () => {
    await deleteWorkout(workout.title);
    onDelete();
  }

  const settingFormatter = (tag: Tag, config: number) => {
    if (tag === 'fatigue') { return 'Fatigue' }
    if (tag === 'endurance') {
      if (config > 60) { return `${config / 60} min` }
      return `${config} sec`;
    }
    if (tag === 'rep/side') { return `${config} reps/side` }
    return `${config} reps`;
  }

  return (
    <div className='workout-table'>
      <button className='x-button' onClick={handleDelete}></button>
      <div className='top'>
        <h2>{workout.title}</h2>
        <p>Rest: {workout.rest} min</p>
        <p>Sets: {workout.sets}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Settings</th>
          </tr>
        </thead>
        <tbody>
          {workout.exercises.map((exercise: Exercise) => (
            <tr key={exercise.name}>
              <td className='exercise-field'>{exercise.name}</td>
              <td>{settingFormatter(exercise.tag, exercise.config)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutTable;