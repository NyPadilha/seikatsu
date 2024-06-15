import { invoke } from '@tauri-apps/api/tauri';
import { Anime } from '../types/IWatchlist';

export async function getWatchlist() {
  const watchlist: Anime[] = await invoke('get_watchlist');
  return watchlist;
}

export async function getNewSeason() {
  const season: Anime[] = await invoke('get_new_season');
  console.log(season);
  return season
}

export async function deleteNewSeason() {
  await invoke('del_new_season');
}

export async function deleteAnime(url: string) {
  await invoke('del_anime', { url });
}

export async function addAnime(anime: Anime) {
  await invoke('add_anime', { anime });
}

export async function updateToWatch(url: string) {
  await invoke('update_to_watch', { url });
}

export async function updateDescription(url: string, description: string) {
  await invoke('update_description', { url, description });
}

export async function updateTag(url: string, tag: string) {
  await invoke('update_tag', { url, tag });
}

export async function updateTitle(url: string, title: string) {
  await invoke('update_title', { url, title });
}
