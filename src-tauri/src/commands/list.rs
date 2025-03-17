use service::BookQuery;
use entity::books::Model as BooksModel;
use tauri::State;
use entity::constant::AppState;
// 定义一个异步函数，用于获取书籍数据
#[tauri::command]
pub async fn get_books(state: State<'_,AppState>)->Result<Vec<BooksModel>,String>{
    BookQuery::get_list(&state.connect)
        .await
        .map_err(|e|e.to_string())

}
#[tauri::command]
pub async fn get_book_by_id(state: State<'_,AppState>, id: i32)->Result<Option<BooksModel>,String>{
    let model=BookQuery::get_book_by_id(&state.connect,id).await.expect("查询失败");
    Ok(model)
}