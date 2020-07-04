import React from 'react';

import { Link } from 'react-router-dom';

import './Header.css';

export default class Header extends React.Component {

    render () {

        return (
           
           <header>

                <h1>
                
                    <Link to = '/' className = 'header-link'>Bookmarks</Link>
                    
                </h1>
                
            </header>

        )

    }

}