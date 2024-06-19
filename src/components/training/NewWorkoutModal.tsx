import React, { useContext, useState } from 'react';
import { TrainingContext } from '../../context/useContext';
import { Workout, Exercise, Tag } from '../../types/ITraining';
import { addWorkout } from '../../services/api';

interface NewWorkoutModalProps {
  onAdd: (workout: Workout) => void;
}

const NewWorkoutModal: React.FC<NewWorkoutModalProps> = ({ onAdd }) => {
  const { setIsNewWorkoutModalOpen } = useContext(TrainingContext);
  const [nameRequired, setNameRequired] = useState<boolean>(false);
  const [configRequired, setConfigRequired] = useState<boolean>(false);
  const [workout, setWorkout] = useState<Workout>({
    title: '',
    rest: 0,
    sets: 0,
    exercises: [],
  });
  const [exercise, setExercise] = useState<Exercise>({
    name: '',
    tag: 'fatigue',
    config: 0,
  });

  const handleAdd = async (workout: Workout) => {
    if (typeof workout.rest === 'string') { workout.rest = Number(workout.rest) }
    if (typeof workout.sets === 'string') { workout.sets = Number(workout.sets) }

    await addWorkout(workout);
    onAdd(workout);
    setIsNewWorkoutModalOpen(false);
  }

  const handleAddExercise = () => {
    setNameRequired(false);
    setConfigRequired(false);

    if (exercise.name === '') { return setNameRequired(true); }

    if (exercise.tag != 'fatigue' && exercise.config === 0) { return setConfigRequired(true); }

    if (typeof exercise.config === 'string') {
      if (exercise.tag != 'fatigue') { return setConfigRequired(true) }
      exercise.config = 0;
    }

    setWorkout({
      ...workout,
      exercises: [...workout.exercises, exercise],
    });

    setExercise({
      name: '',
      tag: 'fatigue',
      config: 0,
    })
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

  const handleDeleteExercise = (index: number) => {
    const newExercises = workout.exercises.filter((_, i) => i !== index);
    setWorkout({
      ...workout,
      exercises: newExercises,
    });
  }

  const handleClose = () => {
    setIsNewWorkoutModalOpen(false);
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setWorkout({
      ...workout,
      [target.name]: target.value,
    });
  }

  return (
    <div className='new-workout-modal'>
      <button className='x-button' onClick={handleClose}></button>
      <h2>- New Workout -</h2>
      <form onSubmit={e => { e.preventDefault(); handleAdd(workout); }}>
        <input
          name="title"
          type="text"
          value={workout.title}
          onChange={handleChange}
          placeholder='Title'
          required
        />
        <input
          name="rest"
          type="text"
          value={workout.rest === 0 ? '' : workout.rest}
          onChange={handleChange}
          placeholder='Rest'
          required
        />
        <input
          name="sets"
          type="text"
          value={workout.sets === 0 ? '' : workout.sets}
          onChange={handleChange}
          placeholder='Sets'
          required
        />

        <div className='exercise'>
          <input
            name="name"
            type="text"
            value={exercise.name}
            onChange={({ target }) => setExercise({ ...exercise, name: target.value })}
            placeholder='Exercise'
          />
          <select
            name="tags"
            value={exercise.tag}
            onChange={({ target }) => setExercise({ ...exercise, tag: target.value as Tag })}
          >
            <option value='fatigue'>Fatigue</option>
            <option value='endurance'>Endurance</option>
            <option value='rep'>Rep</option>
            <option value='rep/side'>Rep/Side</option>
          </select>
          <input
            name="config"
            className='config-input'
            type="text"
            value={exercise.config === 0 ? '' : exercise.config}
            onChange={({ target }) => setExercise({ ...exercise, config: parseInt(target.value) })}
            placeholder='Config'
          />
          <button type="button" onClick={handleAddExercise}>Add</button>
        </div>
        {nameRequired && <p className='name-msg'>Exercise Name Required</p>}
        {configRequired && <p className='config-msg'>Config Required</p>}

        {workout.exercises.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Settings</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {workout.exercises.map((ex: Exercise, index: number) => (
                <tr key={ex.name}>
                  <td>{ex.name}</td>
                  <td>{settingFormatter(ex.tag, ex.config)}</td>
                  <td>
                    <button
                      type="button"
                      className='x-button'
                      onClick={() => handleDeleteExercise(index)}
                    ></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
};

export default NewWorkoutModal;