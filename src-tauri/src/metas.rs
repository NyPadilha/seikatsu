use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;

#[derive(Serialize, Deserialize)]
pub struct SetupMetas {
    pub item: String,
    pub value: f32,
    pub paid: f32,
    pub bought: bool,
}

pub fn read_setup() -> Option<Vec<SetupMetas>> {
    let path = Path::new("setup.json");
    if path.exists() {
        let mut file = File::open(path).expect("Failed to open file");
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .expect("Failed to read file");
        let setup: Vec<SetupMetas> = serde_json::from_str(&contents).expect("Failed to parse JSON");
        Some(setup)
    } else {
        None
    }
}

pub fn write_setup(setup: &Vec<SetupMetas>) {
    let contents = serde_json::to_string(setup).expect("Failed to serialize to JSON");
    let mut file = File::create("setup.json").expect("Failed to create file");
    file.write_all(contents.as_bytes())
        .expect("Failed to write to file");
}

pub fn add_row(item: SetupMetas) {
    let mut setup_list = read_setup().unwrap_or_else(Vec::new);
    setup_list.push(item);
    write_setup(&setup_list);
}

pub fn del_row(item: &str) {
    let mut setup_list = read_setup().unwrap_or_else(Vec::new);
    setup_list.retain(|setup| setup.item != item);
    write_setup(&setup_list);
}

pub fn update_row(item: &str, value: f32, paid: f32, bought: bool) {
    let mut setup_list = read_setup().unwrap_or_else(Vec::new);
    for setup in setup_list.iter_mut() {
        if setup.item == item {
            setup.value = value;
            setup.paid = paid;
            setup.bought = bought;
        }
    }
    write_setup(&setup_list);
}

#[derive(Serialize, Deserialize)]
pub struct FinanceMeta {
    pub value: f32,
}

pub fn read_finance() -> Option<FinanceMeta> {
    let path = Path::new("finance.json");
    if path.exists() {
        let mut file = File::open(path).expect("Failed to open file");
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .expect("Failed to read file");
        let finance: FinanceMeta = serde_json::from_str(&contents).expect("Failed to parse JSON");
        Some(finance)
    } else {
        None
    }
}

pub fn write_finance(value: &FinanceMeta) {
    let contents = serde_json::to_string(value).expect("Failed to serialize to JSON");
    let mut file = File::create("finance.json").expect("Failed to create file");
    file.write_all(contents.as_bytes())
        .expect("Failed to write to file");
}
