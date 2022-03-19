import React, { Fragment } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

import './element.css';

import MultiSelect from './multiselect.js';
import MultiTag from './multitag.js';
import Datepicker from './datepicker.js';

export default function CreateElement(props) {
    return (
        <Fragment>
            <div className="element">
                <img className="elementImage" src="" />
                <div>
                    <h5> Title: </h5> <input type="text" placeholder="Enter the title of the new game..."/>
                    <br></br>
                    <p> Genre(s): </p>
                    {/* <MultiSelect options={props.allGenres} selected={[]} /> */}
                    <br></br>
                    <p> Mode(s): </p>
                    {/* <MultiSelect options={props.allModes} selected={[]} /> */}
                    <br></br>
                    <p> Developer(s): </p>
                    <MultiTag selected={[]} />
                    <br></br>
                    <p> Publisher(s): </p>
                    <MultiTag selected={[]}/>
                    <br></br>
                    <p> Release date: </p>
                    <Datepicker startDate="2022/01/01" />
                    <br></br>
                    <label> Storage: </label><input type="number" placeholder="Add a number..." /><label> GB </label>
                </div>
            </div>
        </Fragment>
    );
}