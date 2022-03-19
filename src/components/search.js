import React, { Component } from 'react';

import './search.css';

import TableIcon from '../resources/table-solid.svg';
import GridIcon from '../resources/th-solid.svg';

export default function Header(props) {
    var icon = null;
    props.grid ? icon = TableIcon : icon = GridIcon
    return (
        <div className="search">
            <input type="search" className="form-control rounded searchBar" placeholder="Search game" aria-label="Search" aria-describedby="search-addon" />
            <img className="displayIcon" src={icon} alt="table" onClick={() => props.handler(!props.grid)} />
        </div>
    );
}
