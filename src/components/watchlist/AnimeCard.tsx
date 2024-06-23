import React, { useState, useEffect, useContext } from 'react';
import { updateTitle, updateDescription, updateToWatch, deleteAnime } from '../../services/api';
import { WatchlistContext } from '../../context/useContext';
import { Anime, Tag } from '../../types/IWatchlist';
import TagModal from './TagModal';
import '../../styles.scss';

interface AnimeCardProps {
  anime: Anime;
  onDelete: () => void;
  onTagChange: (anime: Anime, tag: Tag | null) => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onDelete, onTagChange }) => {
  const [editingDescription, setEditingDescription] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const { isTagModalOpen, setIsTagModalOpen } = useContext(WatchlistContext);
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [to_watch, setToWatch] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const { tagChanged, setTagChanged } = useContext(WatchlistContext);

  const handleDCDesc = (url: string, description: string) => {
    setEditingDescription(url);
    setDescription(description);
  };

  const handleBlurDesc = async (url: string) => {
    setEditingDescription(null);
    if (description !== anime.description) {
      await updateDescription(url, description);
    }
  };

  const handleChangeDesc = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(target.value);
  };

  const handleKeyPressDesc = async ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleBlurDesc(url);
    }
  }

  const handleDCTitle = (url: string, title: string) => {
    setEditingTitle(url);
    setTitle(title);
  };

  const handleBlurTitle = async (url: string) => {
    setEditingTitle(null);
    if (title !== anime.title) {
      await updateTitle(url, title);
    }
  };

  const handleChangeTitle = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
  };

  const handleKeyPressTitle = async ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleBlurTitle(url);
    }
  }

  const handleTag = async (url: string) => {
    setEditingTag(url);
    setIsTagModalOpen(true);
  }

  const handleToWatch = async (url: string) => {
    await updateToWatch(url);
    setToWatch(!to_watch);
  }

  const handleDelete = async (url: string) => {
    await deleteAnime(url);
    onDelete();
  }

  useEffect(() => {
    setTitle(anime.title);
    setUrl(anime.url);
    setImage(anime.image);
    setToWatch(anime.to_watch);
    setDescription(anime.description);
  }, []);

  useEffect(() => {
    if (tagChanged.url === url) {
      onTagChange(anime, tagChanged.tag);
      setTagChanged({ url: null, tag: null });
    }
  }, [tagChanged]);

  return (
    <div className={to_watch ? "card to-watch" : "card watched"}>
      {isTagModalOpen && editingTag && (
        <TagModal url={editingTag} />
      )}
      <div className='card-top'>
        <button onClick={() => handleToWatch(url)} className='o-button'></button>
        {editingDescription === url ? (
          <input
            type='text'
            value={description}
            onChange={handleChangeDesc}
            onBlur={() => handleBlurDesc(url)}
            onKeyDown={handleKeyPressDesc}
            autoFocus
          />
        ) : (
          <p onDoubleClick={() => handleDCDesc(url, description)}>{description}</p>
        )}
        <button onClick={() => handleTag(url)} className='t-button'></button>
        <button onClick={() => handleDelete(url)} className='x-button'></button>
      </div>
      <a href={url}><img src={image} alt={title} /></a>
      {editingTitle === url ? (
        <input
          type='text'
          value={title}
          onChange={handleChangeTitle}
          onBlur={() => handleBlurTitle(url)}
          onKeyDown={handleKeyPressTitle}
          autoFocus
        />
      ) : (
        <h3
          onDoubleClick={() => handleDCTitle(url, title)}
        >
          {title}
        </h3>
      )}
    </div>
  );
};

export default AnimeCard;