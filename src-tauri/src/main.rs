// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides /features/command
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;

#[derive(Serialize, Deserialize)]
struct UserProfile {
    name: String,
    lv: u32,
    xp: u32,
    status: String,
    money: f32,
}

fn read_user_profile() -> Option<UserProfile> {
    let path = Path::new("user_profile.json");
    if path.exists() {
        let mut file = File::open(path).expect("Failed to open file");
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .expect("Failed to read file");
        let profile: UserProfile = serde_json::from_str(&contents).expect("Failed to parse JSON");
        Some(profile)
    } else {
        None
    }
}

fn write_user_profile(profile: &UserProfile) {
    let contents = serde_json::to_string(profile).expect("Failed to serialize to JSON");
    let mut file = File::create("user_profile.json").expect("Failed to create file");
    file.write_all(contents.as_bytes())
        .expect("Failed to write to file");
}

#[tauri::command]
fn get_user_profile() -> Option<UserProfile> {
    read_user_profile()
}

#[tauri::command]
fn update_user_profile(profile: UserProfile) {
    write_user_profile(&profile);
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
