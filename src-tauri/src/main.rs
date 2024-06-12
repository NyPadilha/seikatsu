// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides /features/command
mod profile;

#[tauri::command]
fn get_user_profile() -> Option<profile::UserProfile> {
    profile::read_user_profile()
}

#[tauri::command]
fn update_user_profile(profile: profile::UserProfile) {
    profile::write_user_profile(&profile);
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_user_profile,
            update_user_profile
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
