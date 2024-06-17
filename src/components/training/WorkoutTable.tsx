import React from 'react';
import { Exercise, Workout } from '../../types/ITraining';

interface WorkoutTableProps {
  workout: Workout;
}

const WorkoutTable: React.FC<WorkoutTableProps> = ({ workout }) => {
  return (
    <div className='workout-table'>
      <h2>{workout.title}</h2>
      <p>Rest: {workout.rest}</p>
      <p>Sets: {workout.sets}</p>
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
              <td>{exercise.name}</td>
              <td>{exercise.config}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutTable;