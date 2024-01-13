use chrono::{DateTime, Local};

fn main() {
    let current: DateTime<Local> = Local::now();
    let format = current.format("%d/%m/%Y");
    println!("Rust says, Hello ASL!");
    println!("{}", format);
}
