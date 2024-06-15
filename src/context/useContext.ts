import { createContext } from 'react';
import { TagChanger } from '../types/IWatchlist';

type WatchListContextType = {
  isTagModalOpen: boolean;
  setIsTagModalOpen: (bool: boolean) => void;
  tagChanged: TagChanger;
  setTagChanged: (tag: TagChanger) => void;
  isNewAnimeModalOpen: boolean;
  setIsNewAnimeModalOpen: (bool: boolean) => void;
};

const WatchListContext = createContext<WatchListContextType>({
  isTagModalOpen: false,
  setIsTagModalOpen: () => { },
  tagChanged: { url: null, tag: null },
  setTagChanged: () => { },
  isNewAnimeModalOpen: false,
  setIsNewAnimeModalOpen: () => { },
});

export default WatchListContext;