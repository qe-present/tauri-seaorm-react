use service::BookDelete;
use tauri::State;
use entity::constant::AppState;
#[tauri::command]
pub async fn delete_book(state: State<'_, AppState>, id: i32) -> Result<(), String> {
    BookDelete::delete_book(&state.connect, id).await.map_err(|e| e.to_string())
}