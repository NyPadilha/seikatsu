import React, { useState, useMemo, useEffect, ReactNode } from 'react';
import WatchListContext from './useContext';

interface ProviderProps {
  children: ReactNode;
}

const WatchlistProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isTagModalOpen, setIsTagModalOpenState] = useState<boolean>(false);

  useEffect(() => {
    setIsTagModalOpenState(false);
  }, []);

  const setIsTagModalOpen = (bool: boolean) => {
    setIsTagModalOpenState(bool);
  };

  const store = useMemo(() => ({
    isTagModalOpen,
    setIsTagModalOpen,
  }), [isTagModalOpen]);

  return (
    <WatchListContext.Provider value={store}>
      {children}
    </WatchListContext.Provider>
  );
}

export default WatchlistProvider;