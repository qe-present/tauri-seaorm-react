use entity::books::Model as BookModel;
use entity::books::Entity as BookDao;

use sea_orm::{DatabaseConnection, EntityTrait, DbErr, ActiveModelTrait};
// 声明一个结构体
pub struct BookQuery; 

// 为结构体实现方法
impl BookQuery{
    pub async fn  get_list(db:&DatabaseConnection)->Result<Vec<BookModel>,DbErr>{
        BookDao::find().all(db).await
    }
    pub async fn  get_book_by_id(db:&DatabaseConnection,id:i32)->Result<Option<BookModel>,DbErr>{
        BookDao::find_by_id(id).one(db).await
    }
}