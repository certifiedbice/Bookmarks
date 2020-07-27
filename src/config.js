module.exports={
    PORT:process.env.PORT||8000,
    NODE_ENV:process.env.NODE_ENV||'development',
    //DB_URL:process.env.DB_URL||'postgresql://bookmarks:bookmarks@localhost/bookmarks',
    DATABASE_URL:process.env.DB_URL||'postgresql://bookmarks:bookmarks@localhost/bookmarks',
    //TEST_DB_URL:process.env.TEST_DB_URL||'postgresql://bookmarks:bookmarks@localhost/bookmarks-test',
    TEST_DATABASE_URL:process.env.TEST_DB_URL||'postgresql://bookmarks:bookmarks@localhost/bookmarks-test',
}