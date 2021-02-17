import React from 'react';
import config from '../config';
import BookmarksContext from '../BookmarksContext';

export default class DeleteBookmark extends React.Component {
	
	static contextType=BookmarksContext;

	deleteBookmarkRequest(bookmarkId){

		fetch(config.API_ENDPOINT+`/${ bookmarkId }`,{
			method:'DELETE',
			headers:{'content-type': 'application/json'}
		})
		.then(res=>{
			if(!res.ok){
				// get the error message from the response,
				return res.json().then(error=>{throw error});
			}
		})
		.then(data=>{
			// call the callback when the request is successful
			// this is where the App component can remove it from state
			this.context.deleteBookmark(bookmarkId);
		})
		.catch(error=>{console.error(error);});
    }

    render(){
        return (
            <BookmarksContext.Consumer>
                {(context)=>(
                    <div className = 'BookmarkItem__buttons'>
                        <button className='BookmarkItem__description' onClick={()=>{this.deleteBookmarkRequest(this.props.id)}}>Delete</button>
                    </div>
                )}
            </BookmarksContext.Consumer>
        )
    }
}
