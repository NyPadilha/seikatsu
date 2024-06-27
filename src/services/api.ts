import { invoke } from '@tauri-apps/api/tauri';
import { Anime } from '../types/IWatchlist';
import { Workout } from '../types/ITraining';
import { SetupMetas, FinanceMeta, MetasType, GenericMeta } from '../types/IMetas';

// Watchlist
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

// Training
export async function getWorkouts() {
  const workouts: Workout[] = await invoke('get_workouts');
  return workouts;
}

export async function addWorkout(workout: Workout) {
  await invoke('add_workout', { workout });
}

export async function deleteWorkout(title: string) {
  await invoke('del_workout', { title });
}

// Metas
export async function getSetupMetas() {
  const setupMetas: SetupMetas[] = await invoke('get_setup');
  return setupMetas;
}

export async function addSetupRow(item: SetupMetas) {
  await invoke('add_setup_row', { item });
}

export async function deleteSetupRow(item: string) {
  await invoke('del_setup_row', { item });
}

export async function updateSetupRow(item: string, value: number, paid: number, bought: boolean) {
  await invoke('update_setup_row', { item, value, paid, bought });
}

export async function updateSetupItem(oldItem: string, newItem: string) {
  await invoke('update_setup_item', { oldItem, newItem });
}

export async function getFinanceMetas() {
  const financeMeta: FinanceMeta = await invoke('get_finance');
  return financeMeta;
}

export async function updateFinanceMeta(finance: FinanceMeta) {
  await invoke('update_finance', { finance });
}

export async function getMetas() {
  const metas: MetasType[] = await invoke('get_metas');
  return metas;
}

export async function addMeta(meta: MetasType) {
  await invoke('add_meta', { meta });
}

export async function deleteMeta(meta: string) {
  await invoke('del_meta', { meta });
}

export async function updateMeta(meta: string, newMeta: string) {
  await invoke('update_meta', { meta, newMeta });
}

export async function updateDeadline(meta: string, deadline: string) {
  await invoke('update_deadline', { meta, deadline });
}

export async function updateAchieved(meta: string, achieved: boolean) {
  await invoke('update_achieved', { meta, achieved });
}

export async function getGenericMetas() {
  const genericMetas: GenericMeta[] = await invoke('get_generic_metas');
  return genericMetas;
}

export async function addGenericMeta(meta: GenericMeta) {
  await invoke('add_generic_meta', { meta });
}

export async function deleteGenericMeta(meta: string) {
  await invoke('del_generic_meta', { meta });
}

export async function addRowGenericMeta(meta: string, row: string[]) {
  await invoke('add_row_generic_meta', { meta, row });
}

export async function deleteRowGenericMeta(meta: string, row: string[]) {
  await invoke('del_row_generic_meta', { meta, row });
}

export async function updateRowGenericMeta(title: string, rowId: string, row: string[]) {
  await invoke('update_row_generic_meta', { title, rowId, row });
}