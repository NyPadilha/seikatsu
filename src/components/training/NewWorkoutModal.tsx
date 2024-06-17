import React from 'react';
import { Workout } from '../../types/ITraining';

interface NewWorkoutModalProps {
  onAdd: (workout: Workout) => void;
}

const NewWorkoutModal: React.FC = () => {
  const handleClose = () => {
    // setIsNewWorkoutModalOpen(false);
  }

  return (
    <div>

    </div>
  );
};

export default NewWorkoutModal;