import React from 'react';
import { Anime } from '../types/IWatchlist';

interface DeckProps {
  animes: Anime[];
}

const Deck: React.FC<DeckProps> = ({ animes }) => {
  return (
    <div>
      {animes.map((anime) => (
        <div key={anime.url}>
          <p>{anime.description}</p>
          <img src={anime.image} alt={anime.title} />
          <h3>{anime.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Deck;