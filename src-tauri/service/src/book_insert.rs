use entity::books::ActiveModel as BookActiveModel;
use sea_orm::{DatabaseConnection, EntityTrait, DbErr, ActiveModelTrait, ActiveValue};
use sea_orm::prelude::Decimal;

pub struct BookInsert;
impl BookInsert{
    // 获得 ActiveModel 对象，用于插入数据
    fn get_active_model(title:String,author:String,price:Decimal)->BookActiveModel {
        BookActiveModel {
            id: ActiveValue::NotSet, // 由数据库自动生成
            title: ActiveValue::Set(title),
            author: ActiveValue::Set(author),
            price: ActiveValue::Set(price),
        }
    }
    // 插入数据
    pub async fn insert_book(db:&DatabaseConnection,
                             title:String,
                             author:String,
                             price:Decimal)->Result<(),DbErr>{
        let book = Self::get_active_model(title,author,price);
        book.insert(db).await?;
        Ok(())
    }
}