use tauri::State;
use entity::constant::AppState;

use service::BookInsert;
use service::BookUpdate;
use service::sea_orm::prelude::Decimal;

#[tauri::command]
pub async fn insert_book(
    state: State<'_, AppState>,
    title:String,
    author:String,
    price:Decimal
) -> Result<(), String> {
    BookInsert::insert_book(&state.connect,title,author,price).await.expect("Could not insert book");
    Ok(())
}
#[tauri::command]
pub async fn update_book(
    state: State<'_, AppState>,
    id:i32,
    title:String,
    author:String,
    price:Decimal
) -> Result<(), String> {
    BookUpdate::update_book(&state.connect,id,title,author,price).await.expect("Could not update book");
    Ok(())
}
    