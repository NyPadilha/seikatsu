import React, { useState, useEffect, useContext } from 'react';
import { ChevronUpIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@primer/octicons-react';
import { getWatchlist, getNewSeason, deleteNewSeason } from '../services/api';
import watchlistSwitchCase from '../services/watchlistSwitchCase';
import NewAnimeModal from '../components/watchlist/NewAnimeModal';
import AnimeCard from '../components/watchlist/AnimeCard';
import WatchListContext from '../context/useContext';
import { Anime, Tag } from '../types/IWatchlist';
import { Link } from 'react-router-dom'
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
  const [currentSlide, setCurrentSlide] = useState<number>(() => {
    const saved = localStorage.getItem('currentSlide');
    return saved !== null ? Number(saved) : 0;
  });
  const [isSundayMinimized, setIsSundayMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('isSundayMinimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [isMondayMinimized, setIsMondayMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('isMondayMinimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [isTuesdayMinimized, setIsTuesdayMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('isTuesdayMinimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [isWednesdayMinimized, setIsWednesdayMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('isWednesdayMinimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [isThursdayMinimized, setIsThursdayMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('isThursdayMinimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [isFridayMinimized, setIsFridayMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('isFridayMinimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [isSaturdayMinimized, setIsSaturdayMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('isSaturdayMinimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [isSunMinimized, setIsSunMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('isSunMinimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [isMonMinimized, setIsMonMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('isMonMinimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [isTueMinimized, setIsTueMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('isTueMinimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [isWedMinimized, setIsWedMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('isWedMinimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [isThuMinimized, setIsThuMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('isThuMinimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [isFriMinimized, setIsFriMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('isFriMinimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const [isSatMinimized, setIsSatMinimized] = useState<boolean>(() => {
    const saved = localStorage.getItem('isSatMinimized');
    return saved !== null ? JSON.parse(saved) : false;
  });
  const { isNewAnimeModalOpen, setIsNewAnimeModalOpen } = useContext(WatchListContext);

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
    setCurrentSlide(currentSlide === 0 ? 1 : 0);
  };

  const previousSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 1 : 0);
  }

  useEffect(() => {
    localStorage.setItem('currentSlide', String(currentSlide));
  }, [currentSlide]);

  useEffect(() => {
    localStorage.setItem('isSundayMinimized', JSON.stringify(isSundayMinimized));
  }, [isSundayMinimized]);

  useEffect(() => {
    localStorage.setItem('isMondayMinimized', JSON.stringify(isMondayMinimized));
  }, [isMondayMinimized]);

  useEffect(() => {
    localStorage.setItem('isTuesdayMinimized', JSON.stringify(isTuesdayMinimized));
  }, [isTuesdayMinimized]);

  useEffect(() => {
    localStorage.setItem('isWednesdayMinimized', JSON.stringify(isWednesdayMinimized));
  }, [isWednesdayMinimized]);

  useEffect(() => {
    localStorage.setItem('isThursdayMinimized', JSON.stringify(isThursdayMinimized));
  }, [isThursdayMinimized]);

  useEffect(() => {
    localStorage.setItem('isFridayMinimized', JSON.stringify(isFridayMinimized));
  }, [isFridayMinimized]);

  useEffect(() => {
    localStorage.setItem('isSaturdayMinimized', JSON.stringify(isSaturdayMinimized));
  }, [isSaturdayMinimized]);

  useEffect(() => {
    localStorage.setItem('isSunMinimized', JSON.stringify(isSunMinimized));
  }, [isSunMinimized]);

  useEffect(() => {
    localStorage.setItem('isMonMinimized', JSON.stringify(isMonMinimized));
  }, [isMonMinimized]);

  useEffect(() => {
    localStorage.setItem('isTueMinimized', JSON.stringify(isTueMinimized));
  }, [isTueMinimized]);

  useEffect(() => {
    localStorage.setItem('isWedMinimized', JSON.stringify(isWedMinimized));
  }, [isWedMinimized]);

  useEffect(() => {
    localStorage.setItem('isThuMinimized', JSON.stringify(isThuMinimized));
  }, [isThuMinimized]);

  useEffect(() => {
    localStorage.setItem('isFriMinimized', JSON.stringify(isFriMinimized));
  }, [isFriMinimized]);

  useEffect(() => {
    localStorage.setItem('isSatMinimized', JSON.stringify(isSatMinimized));
  }, [isSatMinimized]);

  const handleGetNewSeason = async () => {
    const season = await getNewSeason()
    setNewSeason(season)
  }

  const handleDeleteNewSeason = async () => {
    await deleteNewSeason()
    setNewSeason([])
  }

  const handleNewAnime = () => {
    setIsNewAnimeModalOpen(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      const watchlist = await getWatchlist() as Anime[]
      clearState()
      watchlist.forEach((anime: Anime) => {
        watchlistSwitchCase(
          anime,
          setSunday,
          setMonday,
          setTuesday,
          setWednesday,
          setThursday,
          setFriday,
          setSaturday,
          setNewSeason,
          setSun,
          setMon,
          setTue,
          setWed,
          setThu,
          setFri,
          setSat,
          setUntagged
        )
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
            <div className='deck'>
              {!isSundayMinimized && sunday.map((anime) => (
                <AnimeCard
                  key={anime.url}
                  anime={anime}
                  onDelete={() => {
                    setSunday(sunday.filter(a => a.url !== anime.url));
                  }}
                  onTagChange={(anime, tag) => {
                    setSunday(sunday.filter(a => a.url !== anime.url));
                    anime.tag = tag as Tag;
                    watchlistSwitchCase(
                      anime,
                      setSunday,
                      setMonday,
                      setTuesday,
                      setWednesday,
                      setThursday,
                      setFriday,
                      setSaturday,
                      setNewSeason,
                      setSun,
                      setMon,
                      setTue,
                      setWed,
                      setThu,
                      setFri,
                      setSat,
                      setUntagged
                    )
                  }}
                />
              ))}
            </div>
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Monday</h1>
              <button onClick={() => setIsMondayMinimized(!isMondayMinimized)}>
                {isMondayMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            <div className='deck'>
              {!isMondayMinimized && monday.map((anime) => (
                <AnimeCard
                  key={anime.url}
                  anime={anime}
                  onDelete={() => {
                    setMonday(monday.filter(a => a.url !== anime.url));
                  }}
                  onTagChange={(anime, tag) => {
                    setMonday(monday.filter(a => a.url !== anime.url));
                    anime.tag = tag as Tag;
                    watchlistSwitchCase(
                      anime,
                      setSunday,
                      setMonday,
                      setTuesday,
                      setWednesday,
                      setThursday,
                      setFriday,
                      setSaturday,
                      setNewSeason,
                      setSun,
                      setMon,
                      setTue,
                      setWed,
                      setThu,
                      setFri,
                      setSat,
                      setUntagged
                    )
                  }}
                />
              ))}
            </div>
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Tuesday</h1>
              <button onClick={() => setIsTuesdayMinimized(!isTuesdayMinimized)}>
                {isTuesdayMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            <div className='deck'>
              {!isTuesdayMinimized && tuesday.map((anime) => (
                <AnimeCard
                  key={anime.url}
                  anime={anime}
                  onDelete={() => {
                    setTuesday(tuesday.filter(a => a.url !== anime.url));
                  }}
                  onTagChange={(anime, tag) => {
                    setTuesday(tuesday.filter(a => a.url !== anime.url));
                    anime.tag = tag as Tag;
                    watchlistSwitchCase(
                      anime,
                      setSunday,
                      setMonday,
                      setTuesday,
                      setWednesday,
                      setThursday,
                      setFriday,
                      setSaturday,
                      setNewSeason,
                      setSun,
                      setMon,
                      setTue,
                      setWed,
                      setThu,
                      setFri,
                      setSat,
                      setUntagged
                    )
                  }}
                />
              ))}
            </div>
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Wednesday</h1>
              <button onClick={() => setIsWednesdayMinimized(!isWednesdayMinimized)}>
                {isWednesdayMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            <div className='deck'>
              {!isWednesdayMinimized && wednesday.map((anime) => (
                <AnimeCard
                  key={anime.url}
                  anime={anime}
                  onDelete={() => {
                    setWednesday(wednesday.filter(a => a.url !== anime.url));
                  }}
                  onTagChange={(anime, tag) => {
                    setWednesday(wednesday.filter(a => a.url !== anime.url));
                    anime.tag = tag as Tag;
                    watchlistSwitchCase(
                      anime,
                      setSunday,
                      setMonday,
                      setTuesday,
                      setWednesday,
                      setThursday,
                      setFriday,
                      setSaturday,
                      setNewSeason,
                      setSun,
                      setMon,
                      setTue,
                      setWed,
                      setThu,
                      setFri,
                      setSat,
                      setUntagged
                    )
                  }}
                />
              ))}
            </div>
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Thursday</h1>
              <button onClick={() => setIsThursdayMinimized(!isThursdayMinimized)}>
                {isThursdayMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            <div className='deck'>
              {!isThursdayMinimized && thursday.map((anime) => (
                <AnimeCard
                  key={anime.url}
                  anime={anime}
                  onDelete={() => {
                    setThursday(thursday.filter(a => a.url !== anime.url));
                  }}
                  onTagChange={(anime, tag) => {
                    setThursday(thursday.filter(a => a.url !== anime.url));
                    anime.tag = tag as Tag;
                    watchlistSwitchCase(
                      anime,
                      setSunday,
                      setMonday,
                      setTuesday,
                      setWednesday,
                      setThursday,
                      setFriday,
                      setSaturday,
                      setNewSeason,
                      setSun,
                      setMon,
                      setTue,
                      setWed,
                      setThu,
                      setFri,
                      setSat,
                      setUntagged
                    )
                  }}
                />
              ))}
            </div>
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Friday</h1>
              <button onClick={() => setIsFridayMinimized(!isFridayMinimized)}>
                {isFridayMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            <div className='deck'>
              {!isFridayMinimized && friday.map((anime) => (
                <AnimeCard
                  key={anime.url}
                  anime={anime}
                  onDelete={() => {
                    setFriday(friday.filter(a => a.url !== anime.url));
                  }}
                  onTagChange={(anime, tag) => {
                    setFriday(friday.filter(a => a.url !== anime.url));
                    anime.tag = tag as Tag;
                    watchlistSwitchCase(
                      anime,
                      setSunday,
                      setMonday,
                      setTuesday,
                      setWednesday,
                      setThursday,
                      setFriday,
                      setSaturday,
                      setNewSeason,
                      setSun,
                      setMon,
                      setTue,
                      setWed,
                      setThu,
                      setFri,
                      setSat,
                      setUntagged
                    )
                  }}
                />
              ))}
            </div>
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Saturday</h1>
              <button onClick={() => setIsSaturdayMinimized(!isSaturdayMinimized)}>
                {isSaturdayMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            <div className='deck'>
              {!isSaturdayMinimized && saturday.map((anime) => (
                <AnimeCard
                  key={anime.url}
                  anime={anime}
                  onDelete={() => {
                    setSaturday(saturday.filter(a => a.url !== anime.url));
                  }}
                  onTagChange={(anime, tag) => {
                    setSaturday(saturday.filter(a => a.url !== anime.url));
                    anime.tag = tag as Tag;
                    watchlistSwitchCase(
                      anime,
                      setSunday,
                      setMonday,
                      setTuesday,
                      setWednesday,
                      setThursday,
                      setFriday,
                      setSaturday,
                      setNewSeason,
                      setSun,
                      setMon,
                      setTue,
                      setWed,
                      setThu,
                      setFri,
                      setSat,
                      setUntagged
                    )
                  }}
                />
              ))}
            </div>
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
            <div className='deck'>
              {!isSunMinimized && sun.map((anime) => (
                <AnimeCard
                  key={anime.url}
                  anime={anime}
                  onDelete={() => {
                    setSun(sun.filter(a => a.url !== anime.url));
                  }}
                  onTagChange={(anime, tag) => {
                    setSun(sun.filter(a => a.url !== anime.url));
                    anime.tag = tag as Tag;
                    watchlistSwitchCase(
                      anime,
                      setSunday,
                      setMonday,
                      setTuesday,
                      setWednesday,
                      setThursday,
                      setFriday,
                      setSaturday,
                      setNewSeason,
                      setSun,
                      setMon,
                      setTue,
                      setWed,
                      setThu,
                      setFri,
                      setSat,
                      setUntagged
                    )
                  }}
                />
              ))}
            </div>
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Monday</h1>
              <button onClick={() => setIsMonMinimized(!isMonMinimized)}>
                {isMonMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            <div className='deck'>
              {!isMonMinimized && mon.map((anime) => (
                <AnimeCard
                  key={anime.url}
                  anime={anime}
                  onDelete={() => {
                    setMon(mon.filter(a => a.url !== anime.url));
                  }}
                  onTagChange={(anime, tag) => {
                    setMon(mon.filter(a => a.url !== anime.url));
                    anime.tag = tag as Tag;
                    watchlistSwitchCase(
                      anime,
                      setSunday,
                      setMonday,
                      setTuesday,
                      setWednesday,
                      setThursday,
                      setFriday,
                      setSaturday,
                      setNewSeason,
                      setSun,
                      setMon,
                      setTue,
                      setWed,
                      setThu,
                      setFri,
                      setSat,
                      setUntagged
                    )
                  }}
                />
              ))}
            </div>
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Tuesday</h1>
              <button onClick={() => setIsTueMinimized(!isTueMinimized)}>
                {isTueMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            <div className='deck'>
              {!isTueMinimized && tue.map((anime) => (
                <AnimeCard
                  key={anime.url}
                  anime={anime}
                  onDelete={() => {
                    setTue(tue.filter(a => a.url !== anime.url));
                  }}
                  onTagChange={(anime, tag) => {
                    setTue(tue.filter(a => a.url !== anime.url));
                    anime.tag = tag as Tag;
                    watchlistSwitchCase(
                      anime,
                      setSunday,
                      setMonday,
                      setTuesday,
                      setWednesday,
                      setThursday,
                      setFriday,
                      setSaturday,
                      setNewSeason,
                      setSun,
                      setMon,
                      setTue,
                      setWed,
                      setThu,
                      setFri,
                      setSat,
                      setUntagged
                    )
                  }}
                />
              ))}
            </div>
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Wednesday</h1>
              <button onClick={() => setIsWedMinimized(!isWedMinimized)}>
                {isWedMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            <div className='deck'>
              {!isWedMinimized && wed.map((anime) => (
                <AnimeCard
                  key={anime.url}
                  anime={anime}
                  onDelete={() => {
                    setWed(wed.filter(a => a.url !== anime.url));
                  }}
                  onTagChange={(anime, tag) => {
                    setWed(wed.filter(a => a.url !== anime.url));
                    anime.tag = tag as Tag;
                    watchlistSwitchCase(
                      anime,
                      setSunday,
                      setMonday,
                      setTuesday,
                      setWednesday,
                      setThursday,
                      setFriday,
                      setSaturday,
                      setNewSeason,
                      setSun,
                      setMon,
                      setTue,
                      setWed,
                      setThu,
                      setFri,
                      setSat,
                      setUntagged
                    )
                  }}
                />
              ))}
            </div>
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Thursday</h1>
              <button onClick={() => setIsThuMinimized(!isThuMinimized)}>
                {isThuMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            <div className='deck'>
              {!isThuMinimized && thu.map((anime) => (
                <AnimeCard
                  key={anime.url}
                  anime={anime}
                  onDelete={() => {
                    setThu(thu.filter(a => a.url !== anime.url));
                  }}
                  onTagChange={(anime, tag) => {
                    setThu(thu.filter(a => a.url !== anime.url));
                    anime.tag = tag as Tag;
                    watchlistSwitchCase(
                      anime,
                      setSunday,
                      setMonday,
                      setTuesday,
                      setWednesday,
                      setThursday,
                      setFriday,
                      setSaturday,
                      setNewSeason,
                      setSun,
                      setMon,
                      setTue,
                      setWed,
                      setThu,
                      setFri,
                      setSat,
                      setUntagged
                    )
                  }}
                />
              ))}
            </div>
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Friday</h1>
              <button onClick={() => setIsFriMinimized(!isFriMinimized)}>
                {isFriMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            <div className='deck'>
              {!isFriMinimized && fri.map((anime) => (
                <AnimeCard
                  key={anime.url}
                  anime={anime}
                  onDelete={() => {
                    setFri(fri.filter(a => a.url !== anime.url));
                  }}
                  onTagChange={(anime, tag) => {
                    setFri(fri.filter(a => a.url !== anime.url));
                    anime.tag = tag as Tag;
                    watchlistSwitchCase(
                      anime,
                      setSunday,
                      setMonday,
                      setTuesday,
                      setWednesday,
                      setThursday,
                      setFriday,
                      setSaturday,
                      setNewSeason,
                      setSun,
                      setMon,
                      setTue,
                      setWed,
                      setThu,
                      setFri,
                      setSat,
                      setUntagged
                    )
                  }}
                />
              ))}
            </div>
          </section>
          <section>
            <div className='min-max-div'>
              <button id='invisible-btn'></button>
              <h1>Saturday</h1>
              <button onClick={() => setIsSatMinimized(!isSatMinimized)}>
                {isSatMinimized ? <ChevronDownIcon /> : <ChevronUpIcon />}
              </button>
            </div>
            <div className='deck'>
              {!isSatMinimized && sat.map((anime) => (
                <AnimeCard
                  key={anime.url}
                  anime={anime}
                  onDelete={() => {
                    setSat(sat.filter(a => a.url !== anime.url));
                  }}
                  onTagChange={(anime, tag) => {
                    setSat(sat.filter(a => a.url !== anime.url));
                    anime.tag = tag as Tag;
                    watchlistSwitchCase(
                      anime,
                      setSunday,
                      setMonday,
                      setTuesday,
                      setWednesday,
                      setThursday,
                      setFriday,
                      setSaturday,
                      setNewSeason,
                      setSun,
                      setMon,
                      setTue,
                      setWed,
                      setThu,
                      setFri,
                      setSat,
                      setUntagged
                    )
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      )}

      {isNewAnimeModalOpen && <NewAnimeModal onAdd={(anime) => {
        watchlistSwitchCase(
          anime,
          setSunday,
          setMonday,
          setTuesday,
          setWednesday,
          setThursday,
          setFriday,
          setSaturday,
          setNewSeason,
          setSun,
          setMon,
          setTue,
          setWed,
          setThu,
          setFri,
          setSat,
          setUntagged
        )
      }} />}
      <div className='untagged'>
        <button id='invisible-btn'></button>
        <h2>Untagged</h2>
        <button onClick={() => handleNewAnime()}><PlusIcon /></button>
      </div>
      <div className='deck'>
        {
          untagged.map((anime) => (
            <AnimeCard
              key={anime.url}
              anime={anime}
              onDelete={() => {
                setUntagged(untagged.filter(a => a.url !== anime.url));
              }}
              onTagChange={(anime, tag) => {
                setUntagged(untagged.filter(a => a.url !== anime.url));
                anime.tag = tag as Tag;
                watchlistSwitchCase(
                  anime,
                  setSunday,
                  setMonday,
                  setTuesday,
                  setWednesday,
                  setThursday,
                  setFriday,
                  setSaturday,
                  setNewSeason,
                  setSun,
                  setMon,
                  setTue,
                  setWed,
                  setThu,
                  setFri,
                  setSat,
                  setUntagged
                )
              }}
            />
          ))
        }
      </div>

      <div className='new-season-section'>
        <button onClick={() => handleDeleteNewSeason()}>Delete New Season</button>
        <h2>New Season</h2>
        <button onClick={() => handleGetNewSeason()}>Get New Season</button>
      </div>
      <div className='deck'>
        {
          newSeason.map((anime) => (
            <AnimeCard
              key={anime.url}
              anime={anime}
              onDelete={() => {
                setNewSeason(newSeason.filter(a => a.url !== anime.url));
              }}
              onTagChange={(anime, tag) => {
                setNewSeason(newSeason.filter(a => a.url !== anime.url));
                anime.tag = tag as Tag;
                watchlistSwitchCase(
                  anime,
                  setSunday,
                  setMonday,
                  setTuesday,
                  setWednesday,
                  setThursday,
                  setFriday,
                  setSaturday,
                  setNewSeason,
                  setSun,
                  setMon,
                  setTue,
                  setWed,
                  setThu,
                  setFri,
                  setSat,
                  setUntagged
                )
              }}
            />
          ))
        }
      </div>

      <Link className='home-btn' to='/'>Home</Link>
    </section>
  );
};

export default WatchList;
