import { createContext } from 'react';

type WatchListContextType = {
  isTagModalOpen: boolean;
  setIsTagModalOpen: (bool: boolean) => void;
};

const WatchListContext = createContext<WatchListContextType>({
  isTagModalOpen: false,
  setIsTagModalOpen: () => { },
});

export default WatchListContext;