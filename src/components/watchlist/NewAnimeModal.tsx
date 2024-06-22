import React, { useContext, useEffect, useState } from 'react';
import { WatchlistContext } from '../../context/useContext';
import { addAnime } from '../../services/api';
import { Anime, Tag } from '../../types/IWatchlist';
import '../../styles.scss';

interface NewAnimeProps {
  onAdd: (anime: Anime) => void;
}

const NewAnime: React.FC<NewAnimeProps> = ({ onAdd }) => {
  const { setIsNewAnimeModalOpen } = useContext(WatchlistContext);
  const [selectedTag, setSelectedTag] = useState<Tag>('untagged');
  const [anime, setAnime] = useState<Anime>({
    title: '',
    url: '',
    image: '',
    to_watch: false,
    description: '',
    tag: selectedTag,
  });

  useEffect(() => {
    console.log(selectedTag);
  }, [selectedTag]);

  const handleAdd = async (anime: Anime) => {
    console.log(anime.tag);
    anime.tag = selectedTag;
    console.log(anime.tag);
    await addAnime(anime);
    onAdd(anime);
    setIsNewAnimeModalOpen(false);
  }

  const handleClose = () => {
    setIsNewAnimeModalOpen(false);
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAnime({
      ...anime,
      [target.name]: target.value,
    });
  }

  return (
    <div className='new-anime-modal'>
      <button onClick={() => handleClose()} className='x-button'></button>
      <h3>- New Anime -</h3>
      <form onSubmit={e => { e.preventDefault(); handleAdd(anime); }}>
        <input
          name="title"
          value={anime.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <input
          name="url"
          value={anime.url}
          onChange={handleChange}
          placeholder="URL"
          required
        />
        <input
          name="image"
          value={anime.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <input
          name="description"
          value={anime.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <section>
          <div>
            <h1>- Alone -</h1>
            <button
              type='button'
              onClick={() => setSelectedTag("sunday")}
              className={"sunday" === selectedTag ? 'selected' : ''}
            >
              Sunday
            </button>
            <button
              type='button'
              onClick={() => setSelectedTag("monday")}
              className={"monday" === selectedTag ? 'selected' : ''}
            >
              Monday
            </button>
            <button
              type='button'
              onClick={() => setSelectedTag("tuesday")}
              className={"tuesday" === selectedTag ? 'selected' : ''}
            >
              Tuesday
            </button>
            <button
              type='button'
              onClick={() => setSelectedTag("wednesday")}
              className={"wednesday" === selectedTag ? 'selected' : ''}
            >
              Wednesday
            </button>
            <button
              type='button'
              onClick={() => setSelectedTag("thursday")}
              className={"thursday" === selectedTag ? 'selected' : ''}
            >
              Thursday
            </button>
            <button
              type='button'
              onClick={() => setSelectedTag("friday")}
              className={"friday" === selectedTag ? 'selected' : ''}
            >
              Friday
            </button>
            <button
              type='button'
              onClick={() => setSelectedTag("saturday")}
              className={"saturday" === selectedTag ? 'selected' : ''}
            >
              Saturday
            </button>
          </div>
          <div>
            <h1>- Together -</h1>
            <button
              type='button'
              onClick={() => setSelectedTag("sun")}
              className={"sun" === selectedTag ? 'selected' : ''}
            >
              Sunday
            </button>
            <button
              type='button'
              onClick={() => setSelectedTag("mon")}
              className={"mon" === selectedTag ? 'selected' : ''}
            >
              Monday
            </button>
            <button
              type='button'
              onClick={() => setSelectedTag("tue")}
              className={"tue" === selectedTag ? 'selected' : ''}
            >
              Tuesday
            </button>
            <button
              type='button'
              onClick={() => setSelectedTag("wed")}
              className={"wed" === selectedTag ? 'selected' : ''}
            >
              Wednesday
            </button>
            <button
              type='button'
              onClick={() => setSelectedTag("thu")}
              className={"thu" === selectedTag ? 'selected' : ''}
            >
              Thursday
            </button>
            <button
              type='button'
              onClick={() => setSelectedTag("fri")}
              className={"fri" === selectedTag ? 'selected' : ''}
            >
              Friday
            </button>
            <button
              type='button'
              onClick={() => setSelectedTag("sat")}
              className={"sat" === selectedTag ? 'selected' : ''}
            >
              Saturday
            </button>
          </div>
        </section>
        <button
          type='button'
          onClick={() => setSelectedTag("new_season")}
          className={"new_season" === selectedTag ? 'selected' : ''}
          id='new-season'
        >
          New Season
        </button>
        <button
          type='button'
          onClick={() => setSelectedTag("untagged")}
          className={"untagged" === selectedTag ? 'selected' : ''}
        >
          Untagged
        </button>
        <button type="submit" className='submit-btn'>- Add Anime -</button>
      </form>
    </div>
  );
};

export default NewAnime;