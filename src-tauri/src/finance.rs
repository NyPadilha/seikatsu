use serde::{Deserialize, Serialize};
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;

#[derive(Serialize, Deserialize)]
pub struct Account {
    pub name: String,
    pub tag: String,
    pub balance: f32,
}

pub fn read_accounts() -> Option<Vec<Account>> {
    let path = Path::new("accounts.json");
    if path.exists() {
        let mut file = File::open(path).expect("Failed to open file");
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .expect("Failed to read file");
        let accounts: Vec<Account> = serde_json::from_str(&contents).expect("Failed to parse JSON");
        Some(accounts)
    } else {
        let accounts = vec![
            Account {
                name: "Cash".to_string(),
                tag: "cash".to_string(),
                balance: 0.0,
            },
            Account {
                name: "C6Bank".to_string(),
                tag: "bank".to_string(),
                balance: 0.0,
            },
            Account {
                name: "NuBank".to_string(),
                tag: "bank".to_string(),
                balance: 0.0,
            },
        ];
        write_accounts(&accounts);
        Some(accounts)
    }
}

pub fn write_accounts(accounts: &Vec<Account>) {
    let contents = serde_json::to_string(accounts).expect("Failed to serialize to JSON");
    let mut file = File::create("accounts.json").expect("Failed to create file");
    file.write_all(contents.as_bytes())
        .expect("Failed to write to file");
}

pub fn add_account(account: Account) {
    let mut accounts_list = read_accounts().unwrap_or_else(Vec::new);
    accounts_list.push(account);
    write_accounts(&accounts_list);
}

pub fn del_account(name: &str) {
    let mut accounts_list = read_accounts().unwrap_or_else(Vec::new);
    accounts_list.retain(|account| account.name != name);
    write_accounts(&accounts_list);
}

#[derive(Serialize, Deserialize)]
pub struct Transaction {
    pub id: u32,
    pub date: String,
    pub account: String,
    pub category: String,
    pub description: String,
    pub value: f32,
}

pub fn read_transactions() -> Option<Vec<Transaction>> {
    let path = Path::new("transactions.json");
    if path.exists() {
        let mut file = File::open(path).expect("Failed to open file");
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .expect("Failed to read file");
        let transactions: Vec<Transaction> =
            serde_json::from_str(&contents).expect("Failed to parse JSON");
        Some(transactions)
    } else {
        None
    }
}

pub fn write_transactions(transactions: &Vec<Transaction>) {
    let contents = serde_json::to_string(transactions).expect("Failed to serialize to JSON");
    let mut file = File::create("transactions.json").expect("Failed to create file");
    file.write_all(contents.as_bytes())
        .expect("Failed to write to file");
}

pub fn add_transaction(transaction: Transaction) {
    let mut transactions_list = read_transactions().unwrap_or_else(Vec::new);
    transactions_list.push(transaction);
    write_transactions(&transactions_list);
}

pub fn del_transaction(id: u32) {
    let mut transactions_list = read_transactions().unwrap_or_else(Vec::new);
    transactions_list.retain(|transaction| transaction.id != id);
    write_transactions(&transactions_list);
}

pub fn update_transaction_date(id: u32, date: &str) {
    let mut transactions_list = read_transactions().unwrap_or_else(Vec::new);
    for transaction in transactions_list.iter_mut() {
        if transaction.id == id {
            transaction.date = date.to_string();
        }
    }
    write_transactions(&transactions_list);
}

pub fn update_transaction_account(id: u32, account: &str) {
    let mut transactions_list = read_transactions().unwrap_or_else(Vec::new);
    for transaction in transactions_list.iter_mut() {
        if transaction.id == id {
            transaction.account = account.to_string();
        }
    }
    write_transactions(&transactions_list);
}

pub fn update_transaction_category(id: u32, category: &str) {
    let mut transactions_list = read_transactions().unwrap_or_else(Vec::new);
    for transaction in transactions_list.iter_mut() {
        if transaction.id == id {
            transaction.category = category.to_string();
        }
    }
    write_transactions(&transactions_list);
}

pub fn update_transaction_description(id: u32, description: &str) {
    let mut transactions_list = read_transactions().unwrap_or_else(Vec::new);
    for transaction in transactions_list.iter_mut() {
        if transaction.id == id {
            transaction.description = description.to_string();
        }
    }
    write_transactions(&transactions_list);
}

pub fn update_transaction_value(id: u32, value: f32) {
    let mut transactions_list = read_transactions().unwrap_or_else(Vec::new);
    for transaction in transactions_list.iter_mut() {
        if transaction.id == id {
            transaction.value = value;
        }
    }
    write_transactions(&transactions_list);
}

#[derive(Serialize, Deserialize)]
pub struct Debt {
    pub id: u32,
    pub description: String,
    pub creditor: String,
    pub value: f32,
    pub cet: f32,
    pub monthly_installment: f32,
    pub outstanding_installments: u32,
}

pub fn read_debts() -> Option<Vec<Debt>> {
    let path = Path::new("debts.json");
    if path.exists() {
        let mut file = File::open(path).expect("Failed to open file");
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .expect("Failed to read file");
        let debts: Vec<Debt> = serde_json::from_str(&contents).expect("Failed to parse JSON");
        Some(debts)
    } else {
        None
    }
}

pub fn write_debts(debts: &Vec<Debt>) {
    let contents = serde_json::to_string(debts).expect("Failed to serialize to JSON");
    let mut file = File::create("debts.json").expect("Failed to create file");
    file.write_all(contents.as_bytes())
        .expect("Failed to write to file");
}

pub fn add_debt(debt: Debt) {
    let mut debts_list = read_debts().unwrap_or_else(Vec::new);
    debts_list.push(debt);
    write_debts(&debts_list);
}

pub fn del_debt(id: u32) {
    let mut debts_list = read_debts().unwrap_or_else(Vec::new);
    debts_list.retain(|debt| debt.id != id);
    write_debts(&debts_list);
}

pub fn update_debt_description(id: u32, description: &str) {
    let mut debts_list = read_debts().unwrap_or_else(Vec::new);
    for debt in debts_list.iter_mut() {
        if debt.id == id {
            debt.description = description.to_string();
        }
    }
    write_debts(&debts_list);
}

pub fn update_debt_creditor(id: u32, creditor: &str) {
    let mut debts_list = read_debts().unwrap_or_else(Vec::new);
    for debt in debts_list.iter_mut() {
        if debt.id == id {
            debt.creditor = creditor.to_string();
        }
    }
    write_debts(&debts_list);
}

pub fn update_debt_value(id: u32, value: f32) {
    let mut debts_list = read_debts().unwrap_or_else(Vec::new);
    for debt in debts_list.iter_mut() {
        if debt.id == id {
            debt.value = value;
        }
    }
    write_debts(&debts_list);
}

pub fn update_debt_cet(id: u32, cet: f32) {
    let mut debts_list = read_debts().unwrap_or_else(Vec::new);
    for debt in debts_list.iter_mut() {
        if debt.id == id {
            debt.cet = cet;
        }
    }
    write_debts(&debts_list);
}

pub fn update_debt_monthly_installment(id: u32, monthly_installment: f32) {
    let mut debts_list = read_debts().unwrap_or_else(Vec::new);
    for debt in debts_list.iter_mut() {
        if debt.id == id {
            debt.monthly_installment = monthly_installment;
        }
    }
    write_debts(&debts_list);
}

pub fn update_debt_outstanding_installments(id: u32, outstanding_installments: u32) {
    let mut debts_list = read_debts().unwrap_or_else(Vec::new);
    for debt in debts_list.iter_mut() {
        if debt.id == id {
            debt.outstanding_installments = outstanding_installments;
        }
    }
    write_debts(&debts_list);
}
