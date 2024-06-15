import { createContext } from 'react';
import { TagChanger } from '../types/IWatchlist';

type WatchListContextType = {
  isTagModalOpen: boolean;
  setIsTagModalOpen: (bool: boolean) => void;
  tagChanged: TagChanger;
  setTagChanged: (tag: TagChanger) => void;
};

const WatchListContext = createContext<WatchListContextType>({
  isTagModalOpen: false,
  setIsTagModalOpen: () => { },
  tagChanged: { url: null, tag: null },
  setTagChanged: () => { },
});

export default WatchListContext;