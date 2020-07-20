require('dotenv').config();
const express=require('express');
const morgan=require('morgan');
const cors=require('cors');
const helmet=require('helmet');
const {NODE_ENV}=require('./config');
const BookmarksService=require('./bookmarks-service');

const app=express();

const morganOption=(NODE_ENV==='production')
	? 'tiny'
	: 'common'

app.use(morgan(morganOption));
app.use(helmet());

app.get('/', (req, res) => {
	res.send('Bookmarks Whoo Yea! Flip Florp!')
  })

app.get('/bookmarks',(req,res,next)=>{
	const knexInstance=req.app.get('db');
	BookmarksService.getAllBookmarks(knexInstance)
	.then(bookmarks=>{
		res.json(bookmarks);
	})
	.catch(next);
});

app.get('/bookmarks/:bookmarks_id',(req,res,next)=>{
	const knexInstance=req.app.get('db');
	BookmarksService.getById(knexInstance, req.params.bookmarks_id)
    .then(bookmark => {
		if (!bookmark) {
			return res.status(404).json({
				error: { message: `Bookmark doesn't exist` }
			})
		}
		res.json({
			id:bookmark.id,
			title:bookmark.title,
			link:bookmark.link,
			rating:rating.rating,
			content:bookmark.content,
		});
     })
     .catch(next);
})

module.exports=app;