import React from 'react';
import config from '../config';
import BookmarksContext from '../BookmarksContext';
import './editbookmark.css';

export default class EditBookmark extends React.Component{

	static contextType=BookmarksContext;

	state={bookmark:{},error:null};
	
	handleSubmit(e){
		
		e.preventDefault();

		const {title,link,rating,content}=e.target;
		
		let bookmark={};
		if(title.value.length>0)bookmark={title:title.value,};
		if(link.value.length>0)bookmark={...bookmark,link:link.value,};
		if(rating.value.length>0)bookmark={...bookmark,rating:rating.value,};
		if(content.value.length>0)bookmark={...bookmark,content:content.value,};

		this.setState({error:null});
		fetch(`${config.API_ENDPOINT}/${this.props.routerProps.location.pathname.slice(1,this.props.routerProps.location.pathname.length)}`,{
			method:'PATCH',
			headers:{'content-type':'application/json'},
			body:JSON.stringify(bookmark)
		})
		.then(res=>{
			if (!res.ok)return res.json().then(error=>{throw error});
			//return res.json();
		})
		.then(()=>{
			title.value='';
			link.value='';
			rating.value='';
			content.value='';
			this.context.getBookmarks();
			this.props.routerProps.history.push('/');
		})
		.catch(error=>{
			console.log(error);
			this.setState({error:error.message});
		});

	};
	
	handleClickCancel=()=>{this.props.routerProps.history.push('/')};
	
	getBookmarks=()=>{
		const bookmarkId=parseInt(this.props.routerProps.location.pathname.slice(1,this.props.routerProps.location.pathname.length));
		fetch(`${config.API_ENDPOINT}/${bookmarkId}`,{
			method:'GET',
			headers:{'content-type':'application/json'}
		})
		.then(res=>{
			if(!res.ok)throw new Error(res.status);
			return res.json();
		})
		.then(res=>{
			this.setState({bookmark:{...res}})
		})
		.catch(error=>this.setState({error}));
	};

	componentDidMount(){this.getBookmarks();}
	
	render(){
		const {error}=this.state;
		return(
			<div className='editbookmark'>
				<h2>Edit Bookmark</h2>
				{error}
				<form className='editbookmark__form' onSubmit={e=>this.handleSubmit(e)}>
					<label htmlFor='title'>Title:</label>
					<input type='text' name='title'	id='title' placeholder='Title' defaultValue={this.state.bookmark.title}/>
						
					<label htmlFor='link'>link:</label>
					<input type='text' name='link' id='link' placeholder='link' defaultValue={this.state.bookmark.link}/>
						
					<label htmlFor='content'>Content:</label>
					<textarea name='content' id='content' placeholder='content' defaultValue={this.state.bookmark.content}/>
						
					<label htmlFor='rating'>Rating: </label>
					<input type='number' name='rating' id='rating' min='1' max='5' defaultValue={this.state.bookmark.rating}/>

					<div className='editbookmark__buttons'>
						<button onClick={this.handleClickCancel}>Cancel</button>
						<button type='submit' >Save</button>
					</div>
				</form>
			</div>
		);
	}
}