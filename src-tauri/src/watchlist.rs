// use serde::{Deserialize, Serialize};
// use std::fs::File;
// use std::io::{Read, Write};
// use std::path::Path;

// #[derive(Serialize, Deserialize)]
// pub struct Anime {
//     pub title: String,
//     pub url: String,
//     pub image: String,
//     pub status: String,
//     // etc
// }

// pub fn read_watchlist() -> Option<Vec<Anime>> {
//     let path = Path::new("watchlist.json");
//     if path.exists() {
//         let mut file = File::open
//         (path).expect("Failed to open file");
//         let mut contents = String::new();
//         file.read_to_string(&mut contents)
//             .expect("Failed to read file");
//         let watchlist: Vec<Anime> = serde_json::from_str(&contents).expect("Failed to parse JSON");
//         Some(watchlist)
//     } else {
//         None
//     }
// }

// pub fn write_watchlist(watchlist: &Vec<Anime>) {
//     let contents = serde_json::to_string(watchlist).expect("Failed to serialize to JSON");
//     let mut file = File::create("watchlist.json").expect("Failed to create file");
//     file.write_all(contents.as_bytes())
//         .expect("Failed to write to file");
// }
