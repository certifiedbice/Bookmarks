import React from 'react';

import { Link } from 'react-router-dom';

import './fab.css';

export default class Fab extends React.Component {
	
	render() {
		
		return (
			
			<div className = 'fab-container'>
				
				<Link to = '/add-bookmark' className = 'fab-link'>
				
					<div className = 'fab'>
				
						&#43;
				
					</div>
				
				</Link>
			
			</div>
			
		);

	}

}