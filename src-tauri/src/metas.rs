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

pub fn add_setup_row(item: SetupMetas) {
    let mut setup_list = read_setup().unwrap_or_else(Vec::new);
    setup_list.push(item);
    write_setup(&setup_list);
}

pub fn del_setup_row(item: &str) {
    let mut setup_list = read_setup().unwrap_or_else(Vec::new);
    setup_list.retain(|setup| setup.item != item);
    write_setup(&setup_list);
}

pub fn update_setup_row(item: &str, value: f32, paid: f32, bought: bool) {
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

pub fn update_setup_item(old_item: &str, new_item: &str) {
    let mut setup_list = read_setup().unwrap_or_else(Vec::new);
    for setup in setup_list.iter_mut() {
        if setup.item == old_item {
            setup.item = new_item.to_string();
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

pub fn write_finance(finance: &FinanceMeta) {
    let contents = serde_json::to_string(finance).expect("Failed to serialize to JSON");
    let mut file = File::create("finance.json").expect("Failed to create file");
    file.write_all(contents.as_bytes())
        .expect("Failed to write to file");
}

#[derive(Serialize, Deserialize)]
pub struct Metas {
    pub meta: String,
    pub deadline: String,
    pub achieved: bool,
}

pub fn read_metas() -> Option<Vec<Metas>> {
    let path = Path::new("metas.json");
    if path.exists() {
        let mut file = File::open(path).expect("Failed to open file");
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .expect("Failed to read file");
        let metas: Vec<Metas> = serde_json::from_str(&contents).expect("Failed to parse JSON");
        Some(metas)
    } else {
        None
    }
}

pub fn write_metas(metas: &Vec<Metas>) {
    let contents = serde_json::to_string(metas).expect("Failed to serialize to JSON");
    let mut file = File::create("metas.json").expect("Failed to create file");
    file.write_all(contents.as_bytes())
        .expect("Failed to write to file");
}

pub fn add_meta(meta: Metas) {
    let mut metas_list = read_metas().unwrap_or_else(Vec::new);
    metas_list.push(meta);
    write_metas(&metas_list);
}

pub fn del_meta(meta: &str) {
    let mut metas_list = read_metas().unwrap_or_else(Vec::new);
    metas_list.retain(|m| m.meta != meta);
    write_metas(&metas_list);
}

pub fn update_deadline(meta: &str, deadline: &str) {
    let mut metas_list = read_metas().unwrap_or_else(Vec::new);
    for m in metas_list.iter_mut() {
        if m.meta == meta {
            m.deadline = deadline.to_string();
        }
    }
    write_metas(&metas_list);
}

pub fn update_achieved(meta: &str, achieved: bool) {
    let mut metas_list = read_metas().unwrap_or_else(Vec::new);
    for m in metas_list.iter_mut() {
        if m.meta == meta {
            m.achieved = achieved;
        }
    }
    write_metas(&metas_list);
}

pub fn del_m(meta: &str) {
    let mut metas_list = read_metas().unwrap_or_else(Vec::new);
    metas_list.retain(|m: &Metas| m.meta != meta);
    write_metas(&metas_list);
}

#[derive(Serialize, Deserialize)]
pub struct GenericMetaTable {
    pub title: String,
    pub columns: Vec<String>,
    pub data: Vec<Vec<String>>,
}

pub fn read_generic_metas() -> Option<Vec<GenericMetaTable>> {
    let path = Path::new("generic_meta.json");
    if path.exists() {
        let mut file = File::open(path).expect("Failed to open file");
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .expect("Failed to read file");
        let generic_meta: Vec<GenericMetaTable> =
            serde_json::from_str(&contents).expect("Failed to parse JSON");
        Some(generic_meta)
    } else {
        None
    }
}

pub fn write_generic_metas(generic_meta: &Vec<GenericMetaTable>) {
    let contents = serde_json::to_string(generic_meta).expect("Failed to serialize to JSON");
    let mut file = File::create("generic_meta.json").expect("Failed to create file");
    file.write_all(contents.as_bytes())
        .expect("Failed to write to file");
}

pub fn add_generic_meta(generic_meta: GenericMetaTable) {
    let mut generic_meta_list = read_generic_metas().unwrap_or_else(Vec::new);
    generic_meta_list.push(generic_meta);
    write_generic_metas(&generic_meta_list);
}

pub fn del_generic_meta(title: &str) {
    let mut generic_meta_list = read_generic_metas().unwrap_or_else(Vec::new);
    generic_meta_list.retain(|generic_meta| generic_meta.title != title);
    write_generic_metas(&generic_meta_list);
}

pub fn add_row_generic_meta(title: &str, row: Vec<String>) {
    let mut generic_meta_list = read_generic_metas().unwrap_or_else(Vec::new);
    for generic_meta in generic_meta_list.iter_mut() {
        if generic_meta.title == title {
            generic_meta.data.push(row.clone());
        }
    }
    write_generic_metas(&generic_meta_list);
}

pub fn del_row_generic_meta(title: &str, row: &Vec<String>) {
    let mut generic_meta_list = read_generic_metas().unwrap_or_else(Vec::new);
    for generic_meta in generic_meta_list.iter_mut() {
        if generic_meta.title == title {
            generic_meta.data.retain(|data| data != row);
        }
    }
    write_generic_metas(&generic_meta_list);
}

pub fn update_row_generic_meta(title: &str, row_id: String, row: Vec<String>) {
    let mut generic_meta_list = read_generic_metas().unwrap_or_else(Vec::new);
    for generic_meta in generic_meta_list.iter_mut() {
        if generic_meta.title == title {
            for data_row in generic_meta.data.iter_mut() {
                if data_row[0] == row_id {
                    *data_row = row.clone();
                }
            }
        }
    }
    write_generic_metas(&generic_meta_list);
}
