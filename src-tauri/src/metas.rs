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

pub fn write_finance(finance: &FinanceMeta) {
    let contents = serde_json::to_string(finance).expect("Failed to serialize to JSON");
    let mut file = File::create("finance.json").expect("Failed to create file");
    file.write_all(contents.as_bytes())
        .expect("Failed to write to file");
}
