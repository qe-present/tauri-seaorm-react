use sea_orm::DatabaseConnection;

#[derive(Clone)]
pub struct AppState{
    pub connect:DatabaseConnection
}
