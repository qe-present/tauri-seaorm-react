// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


mod commands;
use entity::constant::AppState;
use dotenv::dotenv;
use std::env;

use service::{
    sea_orm::{Database}
};

// 启动程序
#[tokio::main]
async fn main() {
    let database_url="mysql://root:123456@localhost:3306/store";
    // 连接数据库
    let connect=Database::connect(database_url)
        .await
        .expect("连接失败");
    let state=AppState{
        connect
    };
    tauri::Builder::default()
        .manage(state)// 全局状态管理
        .invoke_handler(tauri::generate_handler![
            commands::list::get_books,
            commands::list::get_book_by_id,
            commands::insert_function::insert_book,
            commands::insert_function::update_book,
            commands::delete::delete_book,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
    
}