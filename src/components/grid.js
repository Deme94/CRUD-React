import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

import './grid.css';

import Search from './search.js';
import SmallButton from './smallbutton.js';

import LikesIcon from '../resources/thumbs-up-regular.svg';

export default class Grid extends Component {

    state = {
        games: [],
        isLoaded: false,
        grid: true,
        handler: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            games: [],
            isLoaded: false,
            grid: props.grid,
            handler: props.handler
        }
    }

    componentDidMount() {
        fetch("http://localhost:4000/v1/games")
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    games: json.games,
                    isLoaded: true,
                })
            })
    }

    render() {
        const { games, isLoaded, grid, handler } = this.state
        return (
            <Fragment>
                <Search handler={handler} grid={grid} />
                <div className="grid">
                    {games.map((game) => (
                        <GridElement key={game.id} {...game} />
                    ))}
                </div>
            </Fragment>
        )
    }
}

function GridElement(props) {
    return (
        <Fragment>
            <div className="gridElement">
                <Link to={`/element/${props.id}`}><img className="gridElementImage" src={props.image_url} /></Link>
                <div className="gridElementInfo">
                    <h5>{props.title}</h5>
                    <div className="gridElementFooter">
                        <div className="gridElementLikes">
                            <img className="gridElementLikesIcon" src={LikesIcon} alt="Like" />
                            <span className="gridElementLikesNumber">{props.likes}</span>
                        </div>
                        <SmallButton name="Vote!" />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}