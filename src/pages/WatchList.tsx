import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getWatchlist, getNewSeason, deleteNewSeason } from '../services/api';
import { Anime } from '../types/IWatchlist';
import Deck from '../components/Deck';
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@primer/octicons-react';
import '../styles.scss';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSundayMinimized, setIsSundayMinimized] = useState(false);
  const [isMondayMinimized, setIsMondayMinimized] = useState(false);
  const [isTuesdayMinimized, setIsTuesdayMinimized] = useState(false);
  const [isWednesdayMinimized, setIsWednesdayMinimized] = useState(false);
  const [isThursdayMinimized, setIsThursdayMinimized] = useState(false);
  const [isFridayMinimized, setIsFridayMinimized] = useState(false);
  const [isSaturdayMinimized, setIsSaturdayMinimized] = useState(false);
  const [isSunMinimized, setIsSunMinimized] = useState(false);
  const [isMonMinimized, setIsMonMinimized] = useState(false);
  const [isTueMinimized, setIsTueMinimized] = useState(false);
  const [isWedMinimized, setIsWedMinimized] = useState(false);
  const [isThuMinimized, setIsThuMinimized] = useState(false);
  const [isFriMinimized, setIsFriMinimized] = useState(false);
  const [isSatMinimized, setIsSatMinimized] = useState(false);
  const [isUntaggedMinimized, setIsUntaggedMinimized] = useState(false);

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

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 2);
  };

  const previousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 2) % 2);
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
      <div className='t-a-bar'>
        <button onClick={previousSlide}>{<ChevronLeftIcon />}</button>
        {currentSlide === 0 ? <h1>Alone</h1> : <h1>Together</h1>}
        <button onClick={nextSlide}>{<ChevronRightIcon />}</button>
      </div>
      {currentSlide === 0 ? (
        <div className='alone'>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Sunday</h1>
              <button onClick={() => setIsSundayMinimized(!isSundayMinimized)}>
                {isSundayMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            {!isSundayMinimized && <Deck animes={sunday} />}
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Monday</h1>
              <button onClick={() => setIsMondayMinimized(!isMondayMinimized)}>
                {isMondayMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            {!isMondayMinimized && <Deck animes={monday} />}
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Tuesday</h1>
              <button onClick={() => setIsTuesdayMinimized(!isTuesdayMinimized)}>
                {isTuesdayMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            {!isTuesdayMinimized && <Deck animes={tuesday} />}
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Wednesday</h1>
              <button onClick={() => setIsWednesdayMinimized(!isWednesdayMinimized)}>
                {isWednesdayMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            {!isWednesdayMinimized && <Deck animes={wednesday} />}
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Thursday</h1>
              <button onClick={() => setIsThursdayMinimized(!isThursdayMinimized)}>
                {isThursdayMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            {!isThursdayMinimized && <Deck animes={thursday} />}
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Friday</h1>
              <button onClick={() => setIsFridayMinimized(!isFridayMinimized)}>
                {isFridayMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            {!isFridayMinimized && <Deck animes={friday} />}
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Saturday</h1>
              <button onClick={() => setIsSaturdayMinimized(!isSaturdayMinimized)}>
                {isSaturdayMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            {!isSaturdayMinimized && <Deck animes={saturday} />}
          </section>
        </div>
      ) : (
        <div className='together'>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Sunday</h1>
              <button onClick={() => setIsSunMinimized(!isSunMinimized)}>
                {isSunMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            {!isSunMinimized && <Deck animes={sun} />}
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Monday</h1>
              <button onClick={() => setIsMonMinimized(!isMonMinimized)}>
                {isMonMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            {!isMonMinimized && <Deck animes={mon} />}
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Tuesday</h1>
              <button onClick={() => setIsTueMinimized(!isTueMinimized)}>
                {isTueMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            {!isTueMinimized && <Deck animes={tue} />}
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Wednesday</h1>
              <button onClick={() => setIsWedMinimized(!isWedMinimized)}>
                {isWedMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            {!isWedMinimized && <Deck animes={wed} />}
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Thursday</h1>
              <button onClick={() => setIsThuMinimized(!isThuMinimized)}>
                {isThuMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            {!isThuMinimized && <Deck animes={thu} />}
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Friday</h1>
              <button onClick={() => setIsFriMinimized(!isFriMinimized)}>
                {isFriMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            {!isFriMinimized && <Deck animes={fri} />}
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Saturday</h1>
              <button onClick={() => setIsSatMinimized(!isSatMinimized)}>
                {isSatMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            {!isSatMinimized && <Deck animes={sat} />}
          </section>
        </div>
      )}

      <div className='untagged'>
        <button id='invisible-btn'></button>
        <h2>Untagged</h2>
        <button className='untagged-btn' onClick={() => setIsUntaggedMinimized(!isUntaggedMinimized)}>
          {isUntaggedMinimized ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      </div>
      <Deck animes={untagged} />

      <div className='new-season-section'>
        <button onClick={deleteNewSeason}>Delete New Season</button>
        <h2>New Season</h2>
        <button onClick={getNewSeason}>Get New Season</button>
      </div>
      <Deck animes={newSeason} />

      <Link to='/'><button className='home-btn'>Home</button></Link>
    </section>
  );
};

export default WatchList;
