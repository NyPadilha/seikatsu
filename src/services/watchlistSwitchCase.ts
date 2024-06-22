import { Anime } from '../types/IWatchlist';

export default function watchlistSwitchCase(
  anime: Anime,
  setSunday: React.Dispatch<React.SetStateAction<Anime[]>>,
  setMonday: React.Dispatch<React.SetStateAction<Anime[]>>,
  setTuesday: React.Dispatch<React.SetStateAction<Anime[]>>,
  setWednesday: React.Dispatch<React.SetStateAction<Anime[]>>,
  setThursday: React.Dispatch<React.SetStateAction<Anime[]>>,
  setFriday: React.Dispatch<React.SetStateAction<Anime[]>>,
  setSaturday: React.Dispatch<React.SetStateAction<Anime[]>>,
  setNewSeason: React.Dispatch<React.SetStateAction<Anime[]>>,
  setSun: React.Dispatch<React.SetStateAction<Anime[]>>,
  setMon: React.Dispatch<React.SetStateAction<Anime[]>>,
  setTue: React.Dispatch<React.SetStateAction<Anime[]>>,
  setWed: React.Dispatch<React.SetStateAction<Anime[]>>,
  setThu: React.Dispatch<React.SetStateAction<Anime[]>>,
  setFri: React.Dispatch<React.SetStateAction<Anime[]>>,
  setSat: React.Dispatch<React.SetStateAction<Anime[]>>,
  setUntagged: React.Dispatch<React.SetStateAction<Anime[]>>
) {
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
      setNewSeason((prev) => {
        const updatedList = [...prev, anime];
        updatedList.sort((a, b) => a.description.localeCompare(b.description));
        return updatedList;
      });
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
}