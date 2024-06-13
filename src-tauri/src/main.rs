// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use watchlist::Watchlist;

// Learn more about Tauri commands at https://tauri.app/v1/guides /features/command
mod profile;
mod season_scraper;
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
fn get_watchlist() -> Option<Watchlist> {
    watchlist::read_watchlist()
}

#[tauri::command]
fn update_watchlist(watchlist: Watchlist) {
    watchlist::write_watchlist(&watchlist);
}

#[tauri::command]
fn add_new_season() {
    watchlist::add_new_season();
}

#[tauri::command]
fn del_new_season() {
    watchlist::del_new_season();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_user_profile,
            update_user_profile,
            get_watchlist,
            update_watchlist,
            add_new_season,
            del_new_season
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
