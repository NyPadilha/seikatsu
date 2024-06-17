use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;

#[derive(Serialize, Deserialize)]
pub struct Exercise {
    pub name: String,
    pub tag: String,
    pub config: f32,
}

#[derive(Serialize, Deserialize)]
pub struct Workout {
    pub title: String,
    pub rest: f32,
    pub sets: u32,
    pub exercises: Vec<Exercise>,
}

pub fn read_workout() -> Option<Vec<Workout>> {
    let path = Path::new("workout.json");
    if path.exists() {
        let mut file = File::open(path).expect("Failed to open file");
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .expect("Failed to read file");
        let workout: Vec<Workout> = serde_json::from_str(&contents).expect("Failed to parse JSON");
        Some(workout)
    } else {
        None
    }
}

pub fn write_workout(workout: &Vec<Workout>) {
    let contents = serde_json::to_string(workout).expect("Failed to serialize to JSON");
    let mut file = File::create("workout.json").expect("Failed to create file");
    file.write_all(contents.as_bytes())
        .expect("Failed to write to file");
}

pub fn add_workout(workout: Workout) {
    let mut workout_list = read_workout().unwrap_or_else(Vec::new);
    workout_list.push(workout);
    write_workout(&workout_list);
}

pub fn del_workout(title: &str) {
    let mut workout_list = read_workout().unwrap_or_else(Vec::new);
    workout_list.retain(|workout| workout.title != title);
    write_workout(&workout_list);
}
