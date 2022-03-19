import React, { Component, Fragment } from 'react';

import './element.css';

import MultiSelect from './multiselect.js';
import MultiTag from './multitag.js';
import Datepicker from './datepicker.js';

export default class EditElement extends Component {

    state = {
        game: {},
        isLoaded: false,
    }

    componentDidMount() {
        var id = this.props.match.params.id
        fetch("http://localhost:4000/v1/game/" + id)
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    game: json.game,
                    isLoaded: true,
                })
            })
    }

    render() {
        const { game, isLoaded } = this.state
        if (!isLoaded) {
            return (<p>Loading...</p>)
        }
        return (
            <Fragment>
                <div className="element">
                    <img className="elementImage" src={game.url} />
                    <div>
                        <h5> Title: {game.title} </h5>
                        <br></br>
                        <p> Genre(s): </p>
                        {/* <MultiSelect options={props.allGenres} selected={element.genres} /> */}
                        <br></br>
                        <p> Mode(s): </p>
                        {/* <MultiSelect options={props.allModes} selected={element.modes} /> */}
                        <br></br>
                        <p> Developer(s): </p>
                        <MultiTag selected={game.developers} />
                        <br></br>
                        <p> Publisher(s): </p>
                        <MultiTag selected={game.publishers} />
                        <br></br>
                        <p> Release date: </p>
                        <Datepicker startDate={game.release_date} />
                        <br></br>
                        <label> Storage: </label><input type="number" value={game.storage} /><label> GB </label>
                    </div>
                </div>
                <button type="button" className="btn btn-primary">Save</button>
            </Fragment>
        )
    }
}