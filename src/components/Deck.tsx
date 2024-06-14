import React from 'react';
import { Anime } from '../types/IWatchlist';
import '../styles.scss';

interface DeckProps {
  animes: Anime[];
}

const Deck: React.FC<DeckProps> = ({ animes }) => {
  return (
    <div className='deck'>
      {animes.map((anime) => (
        <div key={anime.url} className={anime.to_watch ? "card to-watch" : "card watched"}>
          <p>{anime.description}</p>
          <img src={anime.image} alt={anime.title} />
          <h3><a href={anime.url}>{anime.title}</a></h3>
        </div>
      ))}
    </div>
  );
};

export default Deck;