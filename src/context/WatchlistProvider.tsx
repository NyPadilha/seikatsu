import React, { useState, useMemo, useEffect, ReactNode } from 'react';
import WatchListContext from './useContext';
import { TagChanger } from '../types/IWatchlist';

interface ProviderProps {
  children: ReactNode;
}

const WatchlistProvider: React.FC<ProviderProps> = ({ children }) => {
  const [isTagModalOpen, setIsTagModalOpenState] = useState<boolean>(false);
  const [tagChanged, setTagChangedState] = useState<TagChanger>({ url: null, tag: null });
  const [isNewAnimeModalOpen, setIsNewAnimeModalOpenState] = useState<boolean>(false);

  useEffect(() => {
    setIsTagModalOpenState(false);
  }, []);

  const setIsTagModalOpen = (bool: boolean) => {
    setIsTagModalOpenState(bool);
  };

  const setTagChanged = (tag: TagChanger) => {
    setTagChangedState(tag);
  };

  const setIsNewAnimeModalOpen = (bool: boolean) => {
    setIsNewAnimeModalOpenState(bool);
  }

  const store = useMemo(() => ({
    isTagModalOpen,
    setIsTagModalOpen,
    tagChanged,
    setTagChanged,
    isNewAnimeModalOpen,
    setIsNewAnimeModalOpen,
  }), [isTagModalOpen, tagChanged, isNewAnimeModalOpen]);

  return (
    <WatchListContext.Provider value={store}>
      {children}
    </WatchListContext.Provider>
  );
}

export default WatchlistProvider;