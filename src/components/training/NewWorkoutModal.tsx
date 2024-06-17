import React, { useContext } from 'react';
import { TrainingContext } from '../../context/useContext';
import { Workout } from '../../types/ITraining';

interface NewWorkoutModalProps {
  onAdd: (workout: Workout) => void;
}

const NewWorkoutModal: React.FC<NewWorkoutModalProps> = ({ onAdd }) => {
  const { setIsNewWorkoutModalOpen } = useContext(TrainingContext);

  const handleClose = () => {
    setIsNewWorkoutModalOpen(false);
  }

  return (
    <div>

    </div>
  );
};

export default NewWorkoutModal;