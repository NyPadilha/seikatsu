import React, { useState, useMemo, useEffect, ReactNode } from 'react';
import { MetasContext } from './useContext';

interface ProviderProps {
  children: ReactNode;
}

const MetasProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isCreateTableModalOpen, setIsCreateTableModalOpenState] = useState<boolean>(false);

  useEffect(() => {
    setIsCreateTableModalOpenState(false);
  }, []);

  const setIsCreateTableModalOpen = (bool: boolean) => {
    setIsCreateTableModalOpenState(bool);
  }

  const store = useMemo(() => ({
    isCreateTableModalOpen,
    setIsCreateTableModalOpen,
  }), [isCreateTableModalOpen]);

  return (
    <MetasContext.Provider value={store}>
      {children}
    </MetasContext.Provider>
  );
};

export default MetasProvider;