import React, { useState } from 'react';
import { Anime } from '../types/IWatchlist';
import { updateTitle, updateDescription, updateToWatch, deleteAnime } from '../services/api';
import WatchListContext from '../context/useContext';
import TagModal from './TagModal';
import '../styles.scss';

interface DeckProps {
  animes: Anime[];
}

const Deck: React.FC<DeckProps> = ({ animes }) => {
  const [editingDescription, setEditingDescription] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const { isTagModalOpen, setIsTagModalOpen } = React.useContext(WatchListContext);
  const [editingTag, setEditingTag] = useState<string | null>(null);

  const handleDCDesc = (url: string, description: string) => {
    setEditingDescription(url);
    setDescription(description);
  };

  const handleBlurDesc = async (anime: Anime) => {
    setEditingDescription(null);
    if (description !== anime.description) {
      await updateDescription(anime.url, description);
    }
  };

  const handleChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleDCTitle = (url: string, title: string) => {
    setEditingTitle(url);
    setTitle(title);
  };

  const handleBlurTitle = async (anime: Anime) => {
    setEditingTitle(null);
    if (title !== anime.title) {
      await updateTitle(anime.url, title);
    }
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTag = async (url: string) => {
    setEditingTag(url);
    setIsTagModalOpen(true);
  }

  const handleToWatch = async (url: string) => {
    await updateToWatch(url);
  }

  const handleDelete = async (url: string) => {
    await deleteAnime(url);
  }

  return (
    <div className='deck'>
      {isTagModalOpen && editingTag && (
        <TagModal url={editingTag} />
      )}
      {animes.map((anime) => (
        <div key={anime.url} className={anime.to_watch ? "card to-watch" : "card watched"}>
          <div className='card-top'>
            <button onClick={() => handleToWatch(anime.url)} className='o-button'></button>
            {editingDescription === anime.url ? (
              <input
                type='text'
                value={description}
                onChange={handleChangeDesc}
                onBlur={() => handleBlurDesc(anime)}
                autoFocus
              />
            ) : (
              <p onDoubleClick={() => handleDCDesc(anime.url, anime.description)}>{anime.description}</p>
            )}
            <button onClick={() => handleTag(anime.url)} className='t-button'></button>
            <button onClick={() => handleDelete(anime.url)} className='x-button'></button>
          </div>
          <a href={anime.url}><img src={anime.image} alt={anime.title} /></a>
          {editingTitle === anime.url ? (
            <input
              type='text'
              value={title}
              onChange={handleChangeTitle}
              onBlur={() => handleBlurTitle(anime)}
              autoFocus
            />
          ) : (
            <h3
              onDoubleClick={() => handleDCTitle(anime.url, anime.title)}
            >
              {anime.title}
            </h3>
          )}
        </div>
      ))}
    </div>
  );
};

export default Deck;