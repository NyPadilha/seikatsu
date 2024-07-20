import { invoke } from '@tauri-apps/api/tauri';
import { Anime } from '../types/IWatchlist';
import { Workout } from '../types/ITraining';
import { SetupMetas, FinanceMeta, MetasType, GenericMeta } from '../types/IMetas';
import { Account, Category, Creditor, Transaction, Debt } from '../types/IFinance';

// Watchlist
export async function getWatchlist() {
  const watchlist: Anime[] = await invoke('get_watchlist');
  return watchlist;
}

export async function getNewSeason() {
  const season: Anime[] = await invoke('get_new_season');
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
  console.log(title, rowId, row);
  await invoke('update_row_generic_meta', { title, rowId, row });
}

// Finance
export async function getAccounts() {
  const accounts: Account[] = await invoke('get_accounts');
  return accounts;
}

export async function addAccount(account: Account) {
  await invoke('add_account', { account });
}

export async function deleteAccount(name: string) {
  await invoke('del_account', { name });
}

export async function updateAccountName(oldName: string, newName: string) {
  await invoke('update_account_name', { oldName, newName });
}

export async function updateAccountTag(account: string, tag: string) {
  await invoke('update_account_tag', { account, tag });
}

export async function updateAccountBalance(account: string, balance: number) {
  await invoke('update_account_balance', { account, balance });
}

export async function getCategories() {
  const categories: Category[] = await invoke('get_categories');
  return categories;
}

export async function addCategory(category: Category) {
  await invoke('add_category', { category });
}

export async function deleteCategory(name: string) {
  await invoke('del_category', { name });
}

export async function updateCategoryName(oldName: string, newName: string) {
  await invoke('update_category_name', { oldName, newName });
}

export async function updateCategoryTag(name: string, tag: string) {
  await invoke('update_category_tag', { name, tag });
}

export async function getCreditors() {
  const creditors: Creditor[] = await invoke('get_creditors');
  return creditors;
}

export async function addCreditor(creditor: Creditor) {
  await invoke('add_creditor', { creditor });
}

export async function deleteCreditor(name: string) {
  await invoke('del_creditor', { name });
}

export async function updateCreditorName(oldName: string, newName: string) {
  await invoke('update_creditor_name', { oldName, newName });
}

export async function getTransactions() {
  const transactions: Transaction[] = await invoke('get_transactions');
  return transactions;
}

export async function addTransaction(transaction: Transaction) {
  await invoke('add_transaction', { transaction });
}

export async function deleteTransaction(id: number) {
  await invoke('del_transaction', { id });
}

export async function updateTransactionDate(id: number, date: string) {
  await invoke('update_transaction_date', { id, date });
}

export async function updateTransactionAccount(id: number, account: string) {
  await invoke('update_transaction_account', { id, account });
}

export async function updateTransactionCategory(id: number, category: string) {
  await invoke('update_transaction_category', { id, category });
}

export async function updateTransactionDescription(id: number, description: string) {
  await invoke('update_transaction_description', { id, description });
}

export async function updateTransactionValue(id: number, value: number) {
  await invoke('update_transaction_value', { id, value });
}

export async function getDebts() {
  const debts: Debt[] = await invoke('get_debts');
  return debts;
}

export async function addDebt(debt: Debt) {
  await invoke('add_debt', { debt });
}

export async function deleteDebt(id: number) {
  await invoke('del_debt', { id });
}

export async function updateDebtDescription(id: number, description: string) {
  await invoke('update_debt_description', { id, description });
}

export async function updateDebtCreditor(id: number, creditor: string) {
  await invoke('update_debt_creditor', { id, creditor });
}

export async function updateDebtValue(id: number, value: number) {
  await invoke('update_debt_value', { id, value });
}

export async function updateDebtCet(id: number, cet: number) {
  await invoke('update_debt_cet', { id, cet });
}

export async function updateDebtMonthlyInstallment(id: number, monthly_installment: number) {
  await invoke('update_debt_monthly_installment', { id, monthly_installment });
}

export async function updateDebtOutstandingInstallments(id: number, outstanding_installments: number) {
  await invoke('update_debt_outstanding_installments', { id, outstanding_installments });
}