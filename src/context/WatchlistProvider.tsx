import React, { useState, useMemo, useEffect, ReactNode } from 'react';
import WatchListContext from './useContext';
import { TagChanger } from '../types/IWatchlist';

interface ProviderProps {
  children: ReactNode;
}

const WatchlistProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isTagModalOpen, setIsTagModalOpenState] = useState<boolean>(false);
  const [tagChanged, setTagChangedState] = useState<TagChanger>({ url: null, tag: null });

  useEffect(() => {
    setIsTagModalOpenState(false);
  }, []);

  const setIsTagModalOpen = (bool: boolean) => {
    setIsTagModalOpenState(bool);
  };

  const setTagChanged = (tag: TagChanger) => {
    setTagChangedState(tag);
  };

  const store = useMemo(() => ({
    isTagModalOpen,
    setIsTagModalOpen,
    tagChanged,
    setTagChanged
  }), [isTagModalOpen, tagChanged]);

  return (
    <WatchListContext.Provider value={store}>
      {children}
    </WatchListContext.Provider>
  );
}

export default WatchlistProvider;