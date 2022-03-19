import React, { Component, Fragment } from 'react';

import './element.css';

export default class OpenElement extends Component {

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
                        <p> Genre(s): {Object.entries(game.genres).map(([id, genre]) => (<span key={id}>{genre}</span>))} </p>
                        <p> Mode(s): {Object.entries(game.modes).map(([id, mode]) => (<span key={id}>{mode}</span>))} </p>
                        <p> Developer(s): {game.developers.map((dev, i) => (<span key={i}>{dev}</span>))} </p>
                        <p> Publisher(s): {game.publishers.map((publisher, i) => (<span key={i}>{publisher}</span>))} </p>
                        <p> Release date: {game.releaseDate} </p>
                        <p> Storage: {game.storage} GB </p>
                    </div>
                </div>
            </Fragment>
        );
    }
}