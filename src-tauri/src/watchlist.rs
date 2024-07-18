use crate::season_scraper::get_new_season as scrape_season;
use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;

#[derive(Clone, Serialize, Deserialize)]
pub struct Anime {
    pub title: String,
    pub url: String,
    pub image: String,
    pub to_watch: bool,
    pub description: String,
    pub tag: String,
}

pub fn read_watchlist() -> Option<Vec<Anime>> {
    let path = Path::new("watchlist.json");
    if path.exists() {
        let mut file = File::open(path).expect("Failed to open file");
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .expect("Failed to read file");
        let watchlist: Vec<Anime> = serde_json::from_str(&contents).expect("Failed to parse JSON");
        Some(watchlist)
    } else {
        let watchlist: Vec<Anime> = Vec::new();
        write_watchlist(&watchlist);
        Some(watchlist)
    }
}

pub fn write_watchlist(watchlist: &Vec<Anime>) {
    let contents = serde_json::to_string(watchlist).expect("Failed to serialize to JSON");
    let mut file = File::create("watchlist.json").expect("Failed to create file");
    file.write_all(contents.as_bytes())
        .expect("Failed to write to file");
}

pub fn add_new_season() -> Result<Vec<Anime>, Box<dyn std::error::Error>> {
    let season: Result<Vec<Anime>, Box<dyn std::error::Error>> = scrape_season();
    match season {
        Ok(season) => {
            let mut watchlist = read_watchlist().unwrap_or_else(Vec::new);
            let mut new_season: Vec<Anime> = Vec::new();

            for anime in &season {
                watchlist.push(anime.clone());
                new_season.push(anime.clone());
            }

            write_watchlist(&watchlist);
            Ok(new_season)
        }
        Err(e) => {
            eprintln!("Failed to scrape new season: {}", e);
            Err(e)
        }
    }
}

pub fn del_new_season() {
    let mut watchlist = read_watchlist().unwrap_or_else(Vec::new);

    watchlist.retain(|anime| anime.tag != "new_season");

    write_watchlist(&watchlist);
}

pub fn del_anime(url: &str) {
    let mut watchlist = read_watchlist().unwrap_or_else(Vec::new);

    watchlist.retain(|anime| anime.url != url);

    write_watchlist(&watchlist);
}

pub fn add_anime(anime: Anime) {
    let mut watchlist = read_watchlist().unwrap_or_else(Vec::new);

    watchlist.push(anime);

    write_watchlist(&watchlist);
}

pub fn update_to_watch(url: &str) {
    let mut watchlist = read_watchlist().unwrap_or_else(Vec::new);

    for anime in watchlist.iter_mut() {
        if anime.url == url {
            anime.to_watch = !anime.to_watch;
            break;
        }
    }

    write_watchlist(&watchlist);
}

pub fn update_description(url: &str, description: &str) {
    let mut watchlist = read_watchlist().unwrap_or_else(Vec::new);

    for anime in watchlist.iter_mut() {
        if anime.url == url {
            anime.description = description.to_string();
            break;
        }
    }

    write_watchlist(&watchlist);
}

pub fn update_tag(url: &str, tag: &str) {
    let mut watchlist = read_watchlist().unwrap_or_else(Vec::new);

    for anime in watchlist.iter_mut() {
        if anime.url == url {
            anime.tag = tag.to_string();
            break;
        }
    }

    write_watchlist(&watchlist);
}

pub fn update_title(url: &str, title: &str) {
    let mut watchlist = read_watchlist().unwrap_or_else(Vec::new);

    for anime in watchlist.iter_mut() {
        if anime.url == url {
            anime.title = title.to_string();
            break;
        }
    }

    write_watchlist(&watchlist);
}
