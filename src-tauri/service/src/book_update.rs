use entity::books::ActiveModel as BookActiveModel;
use sea_orm::{DatabaseConnection, EntityTrait, DbErr, ActiveModelTrait, ActiveValue};
use sea_orm::prelude::Decimal;

// 声明一个结构体
pub struct BookUpdate;

// 为结构体实现方法
impl BookUpdate {
    fn get_active_model(id:i32,title:String,author:String,price:Decimal)->BookActiveModel {
        BookActiveModel {
            id: ActiveValue::set(id),
            title: ActiveValue::Set(title),
            author: ActiveValue::Set(author),
            price: ActiveValue::Set(price),
        }
    }

    // 更新数据
    pub async fn update_book(db:&DatabaseConnection,
                             id:i32,
                             title:String,
                             author:String,
                             price:Decimal)->Result<(),DbErr>{
        let book=Self::get_active_model(id,title,author,price);
        book.update(db).await?;
        Ok(())
    }
}
