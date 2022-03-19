import React, {Component} from 'react';

import './header.css';

export default function Header(props){
    return(
        <div className="header">
            <img className="logo" src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png" />
            <span className="headerTitle">Mi CRUD de Games</span>
        </div>
    );
}
