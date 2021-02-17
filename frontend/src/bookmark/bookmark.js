import React from 'react';

import PropTypes from 'prop-types';
import BookmarksContext from '../BookmarksContext';
import Rating from '../rating/rating';
import DeleteBookmark from '../deleteBookmark/deleteBookmark';
import EditBookmarkButton from '../editBookmarkButton/editBookmarkButton';
import './bookmark.css';

export default function Bookmark(props){
	
	Bookmark.propTypes={
		title:PropTypes.string.isRequired,
		link:(props,propName,componentName)=>{
			// get the value of the prop
			const prop=props[propName];

			// do the isRequired check
			if(!prop){
				return new Error(`${propName} is required in ${componentName}. Validation Failed`);
			}

			// check the type
			if(typeof prop!='string'){
				return new Error(`Invalid prop, ${propName} is expected to be a string in ${componentName}. ${typeof prop} found.`);
			}

			// do the custom check here
			// using a simple regex
			if(prop.length< 5||!prop.match(new RegExp(/^https?:\/\//))){
				return new Error(`Invalid prop, ${propName} must be min length 5 and begin http(s)://. Validation Failed.`);
			}
		},
		rating:PropTypes.string.isRequired,
		description:PropTypes.string
	};

	return (
		<BookmarksContext.Consumer>
		    {(context)=>(
				<div className='bookmark'>
					<div className='bookmark__row'>
						<div className='bookmark__title'>
							<a href={props.link} target='_blank' rel='noopener noreferrer'>{props.title}</a>
						</div>
						<Rating value={parseInt(props.rating)}/>
					</div>
					<div className='bookmark__content'>{props.content}</div>
					<div className='button-container'>
						<DeleteBookmark id={props.id}/>
						<EditBookmarkButton id={props.id}/>
					</div>
				</div>
			)}
		</BookmarksContext.Consumer>
	);
}