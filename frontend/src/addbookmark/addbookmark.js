import React from 'react';
import config from '../config';
import BookmarksContext from '../BookmarksContext';
import './addbookmark.css';

export default class AddBookmark extends React.Component {

	static contextType = BookmarksContext;

	state = { error: null };
	
	handleSubmit ( e ) {
		
		e.preventDefault ();

		const { title, link, content, rating } = e.target
		
		const bookmark = {
			title: title.value,
			link: link.value,
			rating: rating.value,
			content: content.value,
		}
		
		this.setState({ error: null })

		fetch ( config.API_ENDPOINT, {
			method: 'POST',
			body: JSON.stringify ( bookmark ),
			//body: bookmark,
			headers: {
			 	'content-type': 'application/json',
			// 	'authorization': `bearer ${ config.API_KEY }`
			}
		} )

		.then ( res => {

			if ( !res.ok ) {
				// get the error message from the response,
				return res.json ().then ( error => {
					// then throw it
					throw error
				} )
			}
			return res.json ()

		} )

		.then ( data => {

			title.value = ''
			link.value = ''
			rating.value = ''
			content.value = ''

			this.context.addBookmark ( data )
			//this.props.handleAdd(bookmark);
			
			this.props.history.push ( '/' )
			//this.props.routerProps.history.push ( '/' );

		} )

		.catch ( error => {
			console.log ( error );
			//this.setState ( {
				
			//	error
				//error: err.message
		
			//});
		
		} );

	}
	
	handleClickCancel = () => {
	
		this.props.history.push ( '/' )
	
	};

	render () {
		
		const { error } = this.state
		
		return (

			<div className = 'addbookmark'>

				<h2>Add Bookmark</h2>
				
				{ error }
				
				<form className = 'addbookmark__form' onSubmit = { e => this.handleSubmit ( e ) }>

					<label htmlFor = 'title'>Title:</label>
					<input
						type = 'text'
						name = 'title'
						id = 'title'
						placeholder = 'Title'
						value = { this.state.title }/>
					
					<label htmlFor = 'link'>link:</label>  
					<input
						type = 'text'
						name = 'link'
						id = 'link'
						placeholder = 'link'
						value = { this.state.link }/>
					
					<label htmlFor = 'content'>Content:</label>  
					<textarea
						name = 'content'
						id = 'content'
						placeholder = 'content'
						value = { this.state.content }/>
					
					<label htmlFor = 'rating'>Rating: </label>
					<input
						type = 'number'
						name = 'rating'
						id = 'rating'
						min = '1'
						max = '5'
						value = { this.state.rating }/>

					<div className = 'addbookmark__buttons'>
						<button  onClick = { this.handleClickCancel }>Cancel</button>
						<button type = 'submit' >Save</button>
					</div>

				</form>

			</div>

		);
	}
}