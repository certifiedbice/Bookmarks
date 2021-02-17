import React  from 'react';
import { Route, Switch } from 'react-router-dom';
import config from './config'
import BookmarksContext from './BookmarksContext';
import Header from './Header/Header';
import BookmarkList from './bookmarklist/bookmarklist';
import AddBookmark from './addbookmark/addbookmark';
import EditBookmark from './editbookmark/editbookmark';
import Fab from './fab/fab';
import './App.css';

export default class App extends React.Component{
	
	state={bookmarks:[],error:null,};

	getBookmarks=()=>{
		fetch(config.API_ENDPOINT,{
			method:'GET',
			headers:{'content-type':'application/json'}
		})
		.then(res=>{
			if(!res.ok)throw new Error(res.status);
			return res.json();
		})
		.then(this.setBookmarks)
		.catch(error=>this.setState({error}));
	};

	setBookmarks=bookmarks=>{
		this.setState({
			bookmarks:bookmarks,
			error:null,
		});
	};
	
	addBookmark=bookmark=>{
		this.setState({bookmarks:[...this.state.bookmarks,bookmark],});
	};

	deleteBookmark=bookmarkId=>{
		const newBookmarks=this.state.bookmarks.filter(bm=>bm.id!==bookmarkId);
		this.setState({bookmarks:newBookmarks});
	};
	
	componentDidMount(){this.getBookmarks();};

	render(){

		const contextValue={
			bookmarks:this.state.bookmarks,
			getBookmarks:this.getBookmarks,
			addBookmark:this.addBookmark,
			deleteBookmark:this.deleteBookmark,
		};

		return(
			<BookmarksContext.Provider value={contextValue}>
				<div className='App'>
					<Header key='Header'/>
					<Switch>
						<Route key='BookmarkList' exact path='/' component={BookmarkList}/>
						<Route key='AddBookmark' exact path='/add-bookmark' component={AddBookmark}/>
						<Route key='EditBookmarkRoute' exact path='/:bookmark_id' render={(routerProps)=>(
							<EditBookmark key='EditBookmark' routerProps={routerProps} bookmarks={this.state.bookmarks}/>
						)}/>
					</Switch>
					<Route key='Fab' exact path='/' component={Fab}/>									
				</div>
			</BookmarksContext.Provider>
		);
	};
}