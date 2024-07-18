// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use finance::Account;
use finance::Category;
use finance::Creditor;
use finance::Debt;
use finance::Transaction;
use metas::FinanceMeta;
use metas::GenericMetaTable;
use metas::Metas;
use metas::SetupMetas;
use training::Workout;
use watchlist::Anime;

mod finance;
mod metas;
mod profile;
mod season_scraper;
mod training;
mod watchlist;

// profile
#[tauri::command]
fn get_user_profile() -> Option<profile::UserProfile> {
    profile::read_user_profile()
}

#[tauri::command]
fn update_user_profile(profile: profile::UserProfile) {
    profile::write_user_profile(&profile);
}

// watchlist
#[tauri::command]
fn get_watchlist() -> Option<Vec<Anime>> {
    watchlist::read_watchlist()
}

#[tauri::command]
fn get_new_season() -> Result<Vec<Anime>, String> {
    match watchlist::add_new_season() {
        Ok(animes) => Ok(animes),
        Err(e) => {
            let error_message = format!("Failed to add new season: {}", e);
            eprintln!("{}", &error_message);
            Err(error_message)
        }
    }
}

#[tauri::command]
fn del_new_season() {
    watchlist::del_new_season();
}

#[tauri::command]
fn del_anime(url: &str) {
    watchlist::del_anime(url);
}

#[tauri::command]
fn add_anime(anime: Anime) {
    watchlist::add_anime(anime);
}

#[tauri::command]
fn update_to_watch(url: &str) {
    watchlist::update_to_watch(url);
}

#[tauri::command]
fn update_description(url: &str, description: &str) {
    watchlist::update_description(url, description);
}

#[tauri::command]
fn update_tag(url: &str, tag: &str) {
    watchlist::update_tag(url, tag);
}

#[tauri::command]
fn update_title(url: &str, title: &str) {
    watchlist::update_title(url, title);
}

// training
#[tauri::command]
fn get_workouts() -> Option<Vec<Workout>> {
    training::read_workout()
}

#[tauri::command]
fn add_workout(workout: Workout) {
    training::add_workout(workout);
}

#[tauri::command]
fn del_workout(title: &str) {
    training::del_workout(title);
}

// metas
#[tauri::command]
fn get_setup() -> Option<Vec<SetupMetas>> {
    metas::read_setup()
}

#[tauri::command]
fn add_setup_row(item: SetupMetas) {
    metas::add_setup_row(item);
}

#[tauri::command]
fn del_setup_row(item: &str) {
    metas::del_setup_row(item);
}

#[tauri::command]
fn update_setup_row(item: &str, value: f32, paid: f32, bought: bool) {
    metas::update_setup_row(item, value, paid, bought);
}

#[tauri::command]
fn update_setup_item(old_item: &str, new_item: &str) {
    metas::update_setup_item(old_item, new_item);
}

#[tauri::command]
fn get_finance() -> Option<FinanceMeta> {
    metas::read_finance()
}

#[tauri::command]
fn update_finance(finance: FinanceMeta) {
    metas::write_finance(&finance);
}

#[tauri::command]
fn get_metas() -> Option<Vec<Metas>> {
    metas::read_metas()
}

#[tauri::command]
fn add_meta(meta: Metas) {
    metas::add_meta(meta);
}

#[tauri::command]
fn del_meta(meta: &str) {
    metas::del_meta(meta);
}

#[tauri::command]
fn update_meta(meta: &str, new_meta: &str) {
    metas::update_meta(meta, new_meta);
}

#[tauri::command]
fn update_deadline(meta: &str, deadline: &str) {
    metas::update_deadline(meta, deadline);
}

#[tauri::command]
fn update_achieved(meta: &str, achieved: bool) {
    metas::update_achieved(meta, achieved);
}

#[tauri::command]
fn get_generic_metas() -> Option<Vec<GenericMetaTable>> {
    metas::read_generic_metas()
}

#[tauri::command]
fn add_generic_meta(meta: GenericMetaTable) {
    metas::add_generic_meta(meta);
}

#[tauri::command]
fn del_generic_meta(meta: &str) {
    metas::del_generic_meta(meta);
}

#[tauri::command]
fn add_row_generic_meta(meta: &str, row: Vec<String>) {
    metas::add_row_generic_meta(meta, row);
}

#[tauri::command]
fn del_row_generic_meta(meta: &str, row: Vec<String>) {
    metas::del_row_generic_meta(meta, &row);
}

#[tauri::command]
fn update_row_generic_meta(title: &str, row_id: String, row: Vec<String>) {
    metas::update_row_generic_meta(title, row_id, row);
}

// finance
#[tauri::command]
fn get_accounts() -> Option<Vec<Account>> {
    finance::read_accounts()
}

#[tauri::command]
fn add_account(account: Account) {
    finance::add_account(account);
}

#[tauri::command]
fn del_account(name: &str) {
    finance::del_account(name);
}

#[tauri::command]
fn update_account_name(old_name: &str, new_name: &str) {
    finance::update_account_name(old_name, new_name);
}

#[tauri::command]
fn update_account_tag(account: &str, tag: &str) {
    finance::update_account_tag(account, tag);
}

#[tauri::command]
fn update_account_balance(account: &str, balance: f32) {
    finance::update_account_balance(account, balance);
}

#[tauri::command]
fn get_categories() -> Option<Vec<Category>> {
    finance::read_categories()
}

#[tauri::command]
fn add_category(category: Category) {
    finance::add_category(category);
}

#[tauri::command]
fn del_category(category: &str) {
    finance::del_category(category);
}

#[tauri::command]
fn update_category_name(old_name: &str, new_name: &str) {
    finance::update_category_name(old_name, new_name);
}

#[tauri::command]
fn update_category_tag(category: &str, tag: &str) {
    finance::update_category_tag(category, tag);
}

#[tauri::command]
fn get_creditors() -> Option<Vec<Creditor>> {
    finance::read_creditors()
}

#[tauri::command]
fn add_creditor(creditor: Creditor) {
    finance::add_creditor(creditor);
}

#[tauri::command]
fn del_creditor(creditor: &str) {
    finance::del_creditor(creditor);
}

#[tauri::command]
fn update_creditor_name(old_name: &str, new_name: &str) {
    finance::update_creditor_name(old_name, new_name);
}

#[tauri::command]
fn get_transactions() -> Option<Vec<Transaction>> {
    finance::read_transactions()
}

#[tauri::command]
fn add_transaction(transaction: Transaction) {
    finance::add_transaction(transaction);
}

#[tauri::command]
fn del_transaction(id: u32) {
    finance::del_transaction(id);
}

#[tauri::command]
fn update_transaction_date(id: u32, date: &str) {
    finance::update_transaction_date(id, date);
}

#[tauri::command]
fn update_transaction_account(id: u32, account: &str) {
    finance::update_transaction_account(id, account);
}

#[tauri::command]
fn update_transaction_category(id: u32, category: &str) {
    finance::update_transaction_category(id, category);
}

#[tauri::command]
fn update_transaction_description(id: u32, description: &str) {
    finance::update_transaction_description(id, description);
}

#[tauri::command]
fn update_transaction_value(id: u32, value: f32) {
    finance::update_transaction_value(id, value);
}

#[tauri::command]
fn get_debts() -> Option<Vec<Debt>> {
    finance::read_debts()
}

#[tauri::command]
fn add_debt(debt: Debt) {
    finance::add_debt(debt);
}

#[tauri::command]
fn del_debt(id: u32) {
    finance::del_debt(id);
}

#[tauri::command]
fn update_debt_description(id: u32, description: &str) {
    finance::update_debt_description(id, description);
}

#[tauri::command]
fn update_debt_creditor(id: u32, creditor: &str) {
    finance::update_debt_creditor(id, creditor);
}

#[tauri::command]
fn update_debt_value(id: u32, value: f32) {
    finance::update_debt_value(id, value);
}

#[tauri::command]
fn update_debt_cet(id: u32, cet: f32) {
    finance::update_debt_cet(id, cet);
}

#[tauri::command]
fn update_debt_monthly_installment(id: u32, monthly_installment: f32) {
    finance::update_debt_monthly_installment(id, monthly_installment);
}

#[tauri::command]
fn update_debt_outstanding_installments(id: u32, outstanding_installments: u32) {
    finance::update_debt_outstanding_installments(id, outstanding_installments);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_user_profile,
            update_user_profile,
            get_watchlist,
            get_new_season,
            del_new_season,
            del_anime,
            add_anime,
            update_to_watch,
            update_description,
            update_tag,
            update_title,
            get_workouts,
            add_workout,
            del_workout,
            get_setup,
            add_setup_row,
            del_setup_row,
            update_meta,
            update_setup_row,
            update_setup_item,
            get_finance,
            update_finance,
            get_metas,
            add_meta,
            del_meta,
            update_deadline,
            update_achieved,
            get_generic_metas,
            add_generic_meta,
            del_generic_meta,
            add_row_generic_meta,
            del_row_generic_meta,
            update_row_generic_meta,
            get_accounts,
            add_account,
            del_account,
            update_account_name,
            update_account_tag,
            update_account_balance,
            get_transactions,
            add_transaction,
            del_transaction,
            update_transaction_date,
            update_transaction_account,
            update_transaction_category,
            update_transaction_description,
            update_transaction_value,
            get_debts,
            add_debt,
            del_debt,
            update_debt_description,
            update_debt_creditor,
            update_debt_value,
            update_debt_cet,
            update_debt_monthly_installment,
            update_debt_outstanding_installments,
            get_categories,
            add_category,
            del_category,
            update_category_name,
            update_category_tag,
            get_creditors,
            add_creditor,
            del_creditor,
            update_creditor_name
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
