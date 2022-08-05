import React, { Component, Fragment } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

import './element.css';

import Multiselect from 'multiselect-react-dropdown';
import { WithContext as ReactTags } from 'react-tag-input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const KeyCodes = {
    comma: 188,
    enter: 13
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];
export default class CreateElement extends Component {

    state = {
        game: {
            title: "",
            genres: [],
            modes: [],
            developers: [],
            publishers: [],
            release_date: "",
            storage: 0
        },
        genres: [],
        modes: [],
        isLoaded: false,
        fileImg: null,
        selectedGenres: [],
        selectedModes: [],
        taggedDevelopers: [],
        taggedPublishers: [],
        releaseDateSelected: new Date(),
    }

    componentDidMount() {
        // get genres and modes
        fetch("http://localhost:4000/v1/genres/")
            .then((response) => response.json())
            .then((json) => {
                var genreOptions = []
                Object.entries(json.genres).forEach(([id, genreName]) => {
                    genreOptions.push({ id: id, name: genreName })
                });
                this.setState({
                    genres: genreOptions,
                })
            })
        fetch("http://localhost:4000/v1/modes/")
            .then((response) => response.json())
            .then((json) => {
                var modeOptions = []
                Object.entries(json.modes).forEach(([id, modeName]) => {
                    modeOptions.push({ id: id, name: modeName })
                });
                this.setState({
                    modes: modeOptions,
                    isLoaded: true
                })
            })
    }

    selectImage = (e) => {
        var fileImg = e.target.files[0]
        var srcImage = URL.createObjectURL(fileImg)
        var game = this.state.game 
        this.state.image_url = srcImage

        this.setState({
            game: game,
            fileImg: fileImg,
            edited: true
        })
        
    }

    onTitleChange = (event) => {
        this.state.game.title = event.target.value
    }

    onSelectGenre = (selectedList, selectedItem) => {
        this.setState({
            selectedGenres: selectedList,
        })
    }

    onRemoveGenre = (selectedList, selectedItem) => {
        this.setState({
            selectedGenres: selectedList,
        })
    }

    onSelectMode = (selectedList, selectedItem) => {
        this.setState({
            selectedModes: selectedList,
        })
    }

    onRemoveMode = (selectedList, selectedItem) => {
        this.setState({
            selectedModes: selectedList,
        })
    }

    handleAdditionDevelopers = (tag) => {
        var game = this.state.game
        var devs = this.state.game.developers
        if (devs == null) devs = []
        devs.push(tag.text)
        this.state.taggedDevelopers.push({ id: tag.text, text: tag.text })
        game.developers = devs

        this.setState({
            game: game
        })
    }

    handleDeleteDevelopers = (i) => {
        var game = this.state.game
        var devs = this.state.game.developers
        devs.splice(i, 1);
        this.state.taggedDevelopers.splice(i, 1)
        game.developers = devs

        this.setState({
            game: game
        })
    }

    handleAdditionPublishers = (tag) => {
        var game = this.state.game
        var publishers = this.state.game.publishers
        if (publishers == null) publishers = []
        publishers.push(tag.text)
        this.state.taggedPublishers.push({ id: tag.text, text: tag.text })
        game.publishers = publishers

        this.setState({
            game: game
        })
    }

    handleDeletePublishers = (i) => {
        var game = this.state.game
        var publishers = this.state.game.publishers
        publishers.splice(i, 1);
        this.state.taggedPublishers.splice(i, 1)
        game.publishers = publishers

        this.setState({
            game: game
        })
    }

    setReleaseDate = (date) => {
        this.setState({
            releaseDateSelected: date
        })
    }

    onStorageChange = (event) => {
        this.state.game.storage = parseInt(event.target.value)
    }

    saveGame = () => {
        var genresSelected = []
        var modesSelected = []
        this.state.selectedGenres.forEach(genre => {
            genresSelected.push(parseInt(genre.id))
        })
        this.state.selectedModes.forEach(mode => {
            modesSelected.push(parseInt(mode.id))
        })

        this.state.game.genres = genresSelected
        this.state.game.modes = modesSelected
        this.state.game.release_date = this.state.releaseDateSelected.toJSON()

        var formData = new FormData()
        formData.append('image', this.state.fileImg)
        formData.append('game', JSON.stringify(this.state.game))

        if (this.state.game.title.length === 0 ||
            formData.length === 0 ||
            this.state.game.genres.length === 0 ||
            this.state.game.modes.length === 0 ||
            this.state.game.developers.length === 0 ||
            this.state.game.publishers.length === 0 ||
            this.state.game.release_date.length === 0 ||
            this.state.game.storage <= 0)
            return

            axios({
                method: "put",
                url: "http://localhost:4000/v1/games/insert",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    window.location.reload()
                })
        
    }

    render() {
        const { game, genres, modes, isLoaded } = this.state
        if (!isLoaded) {
            return (<p>Loading...</p>)
        }
        return (
            <Fragment>
                <div className="element">
                    <div>
                        <input
                            type="file"
                            id="image_file"
                            onChange={this.selectImage}
                        />
                        <img className="elementImage" src={this.state.image_url} />
                    </div>
                    <div>
                        <h5> Title: </h5> <input type="text" placeholder="Enter the title of the new game..." onChange={this.onTitleChange} />
                        <br></br>
                        <p> Genre(s): </p>
                        <Multiselect
                            options={genres} // Options to display in the dropdown
                            onSelect={this.onSelectGenre} // Function will trigger on select event
                            onRemove={this.onRemoveGenre} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                        />
                        <br></br>
                        <p> Mode(s): </p>
                        <Multiselect
                            options={modes} // Options to display in the dropdown
                            onSelect={this.onSelectMode} // Function will trigger on select event
                            onRemove={this.onRemoveMode} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                        />
                        <br></br>
                        <p> Developer(s): </p>
                        <ReactTags
                            tags={this.state.taggedDevelopers}
                            delimiters={delimiters}
                            handleDelete={this.handleDeleteDevelopers}
                            handleAddition={this.handleAdditionDevelopers}
                            inputFieldPosition="bottom"
                            autocomplete
                        />
                        <br></br>
                        <p> Publisher(s): </p>
                        <ReactTags
                            tags={this.state.taggedPublishers}
                            delimiters={delimiters}
                            handleDelete={this.handleDeletePublishers}
                            handleAddition={this.handleAdditionPublishers}
                            inputFieldPosition="bottom"
                            autocomplete
                        />
                        <br></br>
                        <p> Release date: </p>
                        <DatePicker selected={this.state.releaseDateSelected} onChange={(date) => this.setReleaseDate(date)} />
                        <br></br>
                        <label> Storage: </label><input type="number" placeholder="Add a number..." onChange={this.onStorageChange} /><label> GB </label>
                    </div>
                </div>
                <Link to={`/`}><button type="button" className="btn btn-primary" onClick={this.saveGame}>Save</button></Link>
            </Fragment>
        );
    }
}