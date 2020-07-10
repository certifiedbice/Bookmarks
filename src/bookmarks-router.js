const express = require('express');
const { v4: uuid } = require('uuid');
const logger = require('./logger');
const { bookmarks } = require('./store');
const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
    .route('/bookmarks')
    .get((req, res) => {
        res.json(bookmarks)
    })
    .post(bodyParser, (req, res) => {
        const { title, content } = req.body;
            if (!title) {
                logger.error(`Title is required`);
                return res
                    .status(400)
                    .send('Invalid data');
            }
            
            if (!content) {
                logger.error(`Content is required`);
                return res
                    .status(400)
                    .send('Invalid data');
            }
            // get an id
            const id = uuid();
        
            const bookmark = {
                id,
                title,
                content
            };
        
            bookmarks.push(bookmark);
            logger.info(`Bookmarks with id ${id} created`);
        
            res
                .status(201)
                .location(`http://localhost:8000/bookmarks/${id}`)
                .json(bookmark);
        
    });

bookmarksRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
        const { id } = req.params;
        const card = cards.find(c => c.id == id);
      
        // make sure we found a card
        if (!card) {
            logger.error(`Card with id ${id} not found.`);
            return res
                .status(404)
                .send('Card Not Found');
        }
      
        res.json(card);
    })
    .delete((req, res) => {
        const { id } = req.params;
    
        const bookmarkIndex = bookmarks.findIndex(b => b.id == id);
    
        if (bookmarkIndex === -1) {
        logger.error(`Card with id ${id} not found.`);
        return res
            .status(404)
            .send('Not found');
        }
    
       bookmarks.splice(bookmarkIndex, 1);
    
        logger.info(`Bookmark with id ${id} deleted.`);
    
        res
        .status(204)
        .end();
    });

module.exports = bookmarksRouter;