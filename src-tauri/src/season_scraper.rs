use crate::watchlist::Anime;
use reqwest;
use scraper::{Html, Selector}; //ElementRef,
                               // use std::collections::HashMap;

#[tokio::main]
pub async fn get_new_season() -> Result<Vec<Anime>, Box<dyn std::error::Error>> {
    let url = "https://myanimelist.net/anime/season";
    let resp = reqwest::get(url).await?;
    let body = resp.text().await?;

    let document = Html::parse_document(&body);

    let anime_selector = Selector::parse("div.js-anime-category-producer.seasonal-anime.js-seasonal-anime.js-anime-type-all.js-anime-type-1").unwrap();
    let title_selector = Selector::parse("span.js-title").unwrap();
    let date_selector = Selector::parse("span.js-start_date").unwrap();
    let url_selector = Selector::parse("div.image a").unwrap();
    let img_selector = Selector::parse("div.image a img").unwrap();

    let mut season = Vec::new();

    for anime in document.select(&anime_selector) {
        if anime.text().collect::<Vec<_>>().contains(&"Boys Love") {
            continue;
        }

        let title = anime.select(&title_selector).next().unwrap().inner_html();
        let date = anime.select(&date_selector).next().unwrap().inner_html();
        let url = anime
            .select(&url_selector)
            .next()
            .unwrap()
            .value()
            .attr("href")
            .unwrap();
        let img = anime
            .select(&img_selector)
            .next()
            .unwrap()
            .value()
            .attr("src")
            .unwrap_or_else(|| {
                anime
                    .select(&img_selector)
                    .next()
                    .unwrap()
                    .value()
                    .attr("data-src")
                    .unwrap()
            });

        let formatted_date = format!("{}/{}", &date[2..], &date[..2]);

        // let mut anime_data = HashMap::new();
        // anime_data.insert("title", title);
        // anime_data.insert("url", url);
        // anime_data.insert("image", img);
        // anime_data.insert("to_watch", false);
        // anime_data.insert("description", formatted_date);

        season.push(Anime {
            title,
            url: url.to_string(),
            image: img.to_string(),
            to_watch: false,
            description: formatted_date,
        })
    }

    Ok(season)
}
