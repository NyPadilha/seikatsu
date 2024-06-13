import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getWatchlist, getNewSeason, deleteNewSeason } from '../services/api';
import { Anime } from '../types/IWatchlist';
import Deck from '../components/Deck';

const WatchList: React.FC = () => {
  const [sunday, setSunday] = useState<Anime[]>([])
  const [monday, setMonday] = useState<Anime[]>([])
  const [tuesday, setTuesday] = useState<Anime[]>([])
  const [wednesday, setWednesday] = useState<Anime[]>([])
  const [thursday, setThursday] = useState<Anime[]>([])
  const [friday, setFriday] = useState<Anime[]>([])
  const [saturday, setSaturday] = useState<Anime[]>([])
  const [newSeason, setNewSeason] = useState<Anime[]>([])
  const [sun, setSun] = useState<Anime[]>([])
  const [mon, setMon] = useState<Anime[]>([])
  const [tue, setTue] = useState<Anime[]>([])
  const [wed, setWed] = useState<Anime[]>([])
  const [thu, setThu] = useState<Anime[]>([])
  const [fri, setFri] = useState<Anime[]>([])
  const [sat, setSat] = useState<Anime[]>([])
  const [untagged, setUntagged] = useState<Anime[]>([])

  const clearState = () => {
    setSunday([])
    setMonday([])
    setTuesday([])
    setWednesday([])
    setThursday([])
    setFriday([])
    setSaturday([])
    setNewSeason([])
    setSun([])
    setMon([])
    setTue([])
    setWed([])
    setThu([])
    setFri([])
    setSat([])
    setUntagged([])
  }

  useEffect(() => {
    const fetchData = async () => {
      const watchlist = await getWatchlist() as Anime[]
      clearState()
      watchlist.forEach((anime: Anime) => {
        switch (anime.tag) {
          case "sunday":
            setSunday((prev) => [...prev, anime])
            break
          case "monday":
            setMonday((prev) => [...prev, anime])
            break
          case "tuesday":
            setTuesday((prev) => [...prev, anime])
            break
          case "wednesday":
            setWednesday((prev) => [...prev, anime])
            break
          case "thursday":
            setThursday((prev) => [...prev, anime])
            break
          case "friday":
            setFriday((prev) => [...prev, anime])
            break
          case "saturday":
            setSaturday((prev) => [...prev, anime])
            break
          case "new_season":
            setNewSeason((prev) => [...prev, anime])
            break
          case "sun":
            setSun((prev) => [...prev, anime])
            break
          case "mon":
            setMon((prev) => [...prev, anime])
            break
          case "tue":
            setTue((prev) => [...prev, anime])
            break
          case "wed":
            setWed((prev) => [...prev, anime])
            break
          case "thu":
            setThu((prev) => [...prev, anime])
            break
          case "fri":
            setFri((prev) => [...prev, anime])
            break
          case "sat":
            setSat((prev) => [...prev, anime])
            break
          case "untagged":
            setUntagged((prev) => [...prev, anime])
            break
        }
      })
    }
    fetchData()
  }, []);

  return (
    <section id='watchlist'>
      <div>WatchList</div>
      <h2>- Sunday -</h2>
      <Deck animes={sunday} />
      <h2>- Monday -</h2>
      <Deck animes={monday} />
      <h2>- Tuesday -</h2>
      <Deck animes={tuesday} />
      <h2>- Wednesday -</h2>
      <Deck animes={wednesday} />
      <h2>- Thursday -</h2>
      <Deck animes={thursday} />
      <h2>- Friday -</h2>
      <Deck animes={friday} />
      <h2>- Saturday -</h2>
      <Deck animes={saturday} />
      <h2>- Untagged -</h2>
      <Deck animes={untagged} />
      <h2>- Sun -</h2>
      <Deck animes={sun} />
      <h2>- Mon -</h2>
      <Deck animes={mon} />
      <h2>- Tue -</h2>
      <Deck animes={tue} />
      <h2>- Wed -</h2>
      <Deck animes={wed} />
      <h2>- Thu -</h2>
      <Deck animes={thu} />
      <h2>- Fri -</h2>
      <Deck animes={fri} />
      <h2>- Sat -</h2>
      <Deck animes={sat} />
      <h2>- New Season -</h2>
      <Deck animes={newSeason} />

      <button onClick={getNewSeason}>Get New Season</button>
      <button onClick={deleteNewSeason}>Delete New Season</button>
      <Link to='/'>Home</Link>
    </section>
  );
};

export default WatchList;
