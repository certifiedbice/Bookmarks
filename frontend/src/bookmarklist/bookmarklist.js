import React from 'react';
import BookmarksContext from '../BookmarksContext';
import PropTypes from 'prop-types';
import Bookmark from '../bookmark/bookmark';
import './bookmarklist.css';

export default class BookmarkList extends React.Component{

	static defaultProps={bookmarks:[]};
	static contextType=BookmarksContext;
	
	render(){
		const {bookmarks}=this.context;
		return(
			<section className='BookmarkList'>
				<div className='BookmarkList__list' aria-live='polite'>
					{bookmarks.map(bookmark=><Bookmark key={bookmark.id}{...bookmark}/>)}
			    </div>
			</section>
		);
	};
}

BookmarkList.propTypes={
	bookmarks:PropTypes.arrayOf(PropTypes.shape({
		title:PropTypes.string.isRequired,
		link:PropTypes.string.isRequired,
		rating:PropTypes.string.isRequired,
		content:PropTypes.string.isRequired
	}))
}