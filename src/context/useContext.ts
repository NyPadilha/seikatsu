import { createContext } from 'react';
import { TagChanger } from '../types/IWatchlist';

type WatchlistContextType = {
  isTagModalOpen: boolean;
  setIsTagModalOpen: (bool: boolean) => void;
  tagChanged: TagChanger;
  setTagChanged: (tag: TagChanger) => void;
  isNewAnimeModalOpen: boolean;
  setIsNewAnimeModalOpen: (bool: boolean) => void;
};

const WatchlistContext = createContext<WatchlistContextType>({
  isTagModalOpen: false,
  setIsTagModalOpen: () => { },
  tagChanged: { url: null, tag: null },
  setTagChanged: () => { },
  isNewAnimeModalOpen: false,
  setIsNewAnimeModalOpen: () => { },
});

type TrainingContextType = {
  isNewWorkoutModalOpen: boolean;
  setIsNewWorkoutModalOpen: (bool: boolean) => void;
};

const TrainingContext = createContext<TrainingContextType>({
  isNewWorkoutModalOpen: false,
  setIsNewWorkoutModalOpen: () => { },
});

type MetasContextType = {
  isCreateTableModalOpen: boolean;
  setIsCreateTableModalOpen: (bool: boolean) => void;
};

const MetasContext = createContext<MetasContextType>({
  isCreateTableModalOpen: false,
  setIsCreateTableModalOpen: () => { },
});

export {
  WatchlistContext,
  TrainingContext,
  MetasContext,
}