use sea_orm::{DatabaseConnection,DbErr,EntityTrait};
use entity::books::Entity as BookDao;

pub struct BookDelete;
impl BookDelete{
    pub async fn delete_book(connect: &DatabaseConnection, id: i32) -> Result<(), DbErr> {
        BookDao::delete_by_id(id)
            .exec(connect)
            .await?;
        Ok(())
    }
}