import React, { useState, useMemo, useEffect, ReactNode } from 'react';
import { TrainingContext } from './useContext';

interface ProviderProps {
  children: ReactNode;
}

const TrainingProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isNewWorkoutModalOpen, setIsNewWorkoutModalOpenState] = useState<boolean>(false);

  useEffect(() => {
    setIsNewWorkoutModalOpenState(false);
  }, []);

  const setIsNewWorkoutModalOpen = (bool: boolean) => {
    setIsNewWorkoutModalOpenState(bool);
  };

  const store = useMemo(() => ({
    isNewWorkoutModalOpen,
    setIsNewWorkoutModalOpen,
  }), [isNewWorkoutModalOpen]);

  return (
    <TrainingContext.Provider value={store}>
      {children}
    </TrainingContext.Provider>
  );
};

export default TrainingProvider;