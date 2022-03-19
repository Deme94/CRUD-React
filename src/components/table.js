import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

import './table.css';

import Search from './search.js';

import EditIcon from '../resources/edit-regular.svg';
import DeleteIcon from '../resources/trash-alt-regular.svg';

export default class Table extends Component {

    state = {
        games: [],
        isLoaded: false,
        grid: true,
        handler: null,
    }

    constructor(props){
        super(props);
        this.state = {
            games: [],
            isLoaded: false,
            grid: props.grid,
            handler: props.handler
          }
    }
    componentDidMount(){
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
        const {games, isLoaded, grid, handler} = this.state
        return (
            <Fragment>
                <Search handler={handler} grid={grid} />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Genre(s)</th>
                            <th scope="col">Mode(s)</th>
                            <th scope="col">Developer(s)</th>
                            <th scope="col">Publisher(s)</th>
                            <th scope="col">Released</th>
                            <th scope="col">Storage</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game) => (
                            <tr key={game.id}>
                                <th scope="row">{game.id}</th>
                                <td><Link to={`/element/${game.id}`}>{game.title}</Link></td>
                                <td>{Object.entries(game.genres).map(([id, genre]) => (<p key={id}>{genre}</p>))}</td>
                                <td>{Object.entries(game.modes).map(([id, mode]) => (<p key={id}>{mode}</p>))}</td>
                                <td>{game.developers.map((dev, i) => (<p key={i}>{dev}</p>))}</td>
                                <td>{game.publishers.map((publisher, i) => (<p key={i}>{publisher}</p>))}</td>
                                <td>{game.release_date}</td>
                                <td>{game.storage} GB</td>
                                <td>
                                    <Link to={`/editelement/${game.id}`}><img className="tableIcon" src={EditIcon} alt="Edit" /></Link>
                                    <img className="tableIcon" src={DeleteIcon} alt="Delete" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to={`/createelement`}><button type="button" className="btn btn-primary">Add New Element</button></Link>
            </Fragment>
        )
    }
}