// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use training::Workout;
use watchlist::Anime;

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
fn read_workout() -> Option<Vec<Workout>> {
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
            read_workout,
            add_workout,
            del_workout
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
