use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;

#[derive(Serialize, Deserialize)]
pub struct UserProfile {
    pub name: String,
    pub lv: u32,
    pub xp: u32,
    pub status: String,
    pub money: f32,
}

pub fn read_user_profile() -> Option<UserProfile> {
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

pub fn write_user_profile(profile: &UserProfile) {
    let contents = serde_json::to_string(profile).expect("Failed to serialize to JSON");
    let mut file = File::create("user_profile.json").expect("Failed to create file");
    file.write_all(contents.as_bytes())
        .expect("Failed to write to file");
}
