import React from 'react'

const BookmarksContext=React.createContext({
    bookmarks:[],
    getBookmarks:()=>{},
    addBookmark:()=>{},
    deleteBookmark:()=>{},
});

export default BookmarksContext;