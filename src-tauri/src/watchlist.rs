use crate::season_scraper::get_new_season as scrape_season;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;

#[derive(Serialize, Deserialize)]
pub struct Anime {
    pub title: String,
    pub url: String,
    pub image: String,
    pub to_watch: bool,
    pub description: String,
}
// talvez mudar para um sistema de tag para weekday e together/alone

#[derive(Serialize, Deserialize)]
pub struct Watchlist {
    pub my_list: HashMap<String, Vec<Anime>>,
    pub together_list: HashMap<String, Vec<Anime>>,
    pub new_season: Vec<Anime>,
    pub no_weekday: Vec<Anime>,
}

pub fn read_watchlist() -> Option<Watchlist> {
    let path = Path::new("watchlist.json");
    if path.exists() {
        let mut file = File::open(path).expect("Failed to open file");
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .expect("Failed to read file");
        let watchlist: Watchlist = serde_json::from_str(&contents).expect("Failed to parse JSON");
        Some(watchlist)
    } else {
        None
    }
}

pub fn write_watchlist(watchlist: &Watchlist) {
    let contents = serde_json::to_string(watchlist).expect("Failed to serialize to JSON");
    let mut file = File::create("watchlist.json").expect("Failed to create file");
    file.write_all(contents.as_bytes())
        .expect("Failed to write to file");
}

pub fn add_new_season() {
    let season: Result<Vec<Anime>, Box<dyn std::error::Error>> = scrape_season();
    match season {
        Ok(season) => {
            let mut watchlist = read_watchlist().unwrap_or_else(|| Watchlist {
                my_list: HashMap::new(),
                together_list: HashMap::new(),
                new_season: Vec::new(),
                no_weekday: Vec::new(),
            });

            watchlist.new_season = season;

            write_watchlist(&watchlist);
        }
        Err(e) => {
            eprintln!("Failed to scrape new season: {}", e);
        }
    }
}

pub fn del_new_season() {
    let mut watchlist = read_watchlist().unwrap_or_else(|| Watchlist {
        my_list: HashMap::new(),
        together_list: HashMap::new(),
        new_season: Vec::new(),
        no_weekday: Vec::new(),
    });

    watchlist.new_season.clear();

    write_watchlist(&watchlist);
}
