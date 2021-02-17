module.exports={
    PORT:process.env.PORT||8000,
    NODE_ENV:process.env.NODE_ENV||'development',
    //DB_URL:process.env.DB_URL||'postgresql://bookmarks:bookmarks@localhost/bookmarks',
    DATABASE_URL:process.env.DB_URL||'postgres://hcyccftcmzcstj:a0565a9fed9df40c946ee77a671a15f037f49a1770089e2c3101c4a74cdddcf9@ec2-54-236-169-55.compute-1.amazonaws.com:5432/df9v7opnndsfbf',
    //TEST_DB_URL:process.env.TEST_DB_URL||'postgresql://bookmarks:bookmarks@localhost/bookmarks-test',
    TEST_DATABASE_URL:process.env.TEST_DB_URL||'postgresql://bookmarks:bookmarks@localhost/bookmarks-test',
}