import React from 'react';
import { Link } from 'react-router-dom';
export default class EditBookmarkButton extends React.Component {
	
	render(){
        return (		
            <Link to={`/${this.props.id}`}>Edit</Link>
        )
    }
}