import React  from 'react';

import { Route, Switch } from 'react-router-dom';

//import BookmarksContext from './BookmarksContext';

import Header from './Header/Header';

import AddBookmark from './addbookmark/addbookmark';

import BookmarkList from './bookmarklist/bookmarklist';

import Fab from './fab/fab';

import './App.css';

export default class App extends React.Component{

	constructor(props) {

		super(props);
		this.state = {
			bookmarks: [],
			error: null,
		};

	}

	componentDidMount() {

		const url = 'https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
		const options = {
		method: 'GET',
		headers: {
			"Authorization": "Bearer $2a$10$C5JdrJW6wn924lmUyKXXWuEmS.eDuSKL.82e.2vUHDVIFw86GPg6W",
			"Content-Type": "application/json"
		}
		};

		fetch(url, options)
		.then(res => {
			if(!res.ok) {
			throw new Error('Something went wrong, please try again later.');
			}
			return res;
		})
		.then(res => res.json())
		.then(data => {
			this.setState({
			bookmarks: data,
			error: null
			});
		})
		.catch(err => {
			this.setState({
			error: err.message
			});
		});

	}

	addBookmark(bookmark) {

		this.setState({
		bookmarks: [...this.state.bookmarks, bookmark],
		showAddForm: false
		});

	}

		render () {

			// const contextValue = {

			// 	bookmarks: this.state.bookmarks,

			// 	addBookmark: this.addBookmark,

			// }

			return (

				//<BookmarksContext.Provider value={contextValue}>

					<div className = 'App'>
							
						<Header key = 'Header' />
							
						<Switch>

							<Route key = 'BookmarkList' exact path = '/' render = { ( routerProps ) => ( <BookmarkList key = 'BookmarkList' routerProps = { routerProps } bookmarks = { this.state.bookmarks } showForm = { show => this.setShowAddForm ( show ) }/> ) } />
							
							<Route key = 'AddBookmark' exact path = '/add-bookmark' render = { ( routerProps ) => ( <AddBookmark key = 'AddBookmark' routerProps = { routerProps } showForm = { show => this.setShowAddForm ( show ) } handleAdd = { bookmark => this.addBookmark ( bookmark ) }/> ) } />

						</Switch>

						<Switch>

							<Route key = 'Fab' exact path = '/' render = { ( routerProps ) => ( <Fab key = 'Fab' /> ) } />

						</Switch>
							
					</div>

				//</BookmarksContext.Provider>

			);

		}

}