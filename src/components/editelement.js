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
export default class EditElement extends Component {

    state = {
        game: {},
        genres: [],
        modes: [],
        isLoaded: false,
        edited: false,
        fileImg: null,
        selectedGenres: [],
        selectedModes: [],
        taggedDevelopers: [],
        taggedPublishers: [],
        releaseDateSelected: new Date(),
    }

    componentDidMount() {
        var id = this.props.match.params.id
        this.setState({
            id: id
        })
        // get game
        fetch("http://localhost:4000/v1/game/" + id)
            .then((response) => response.json())
            .then((json) => {
                var selectedGenres = []
                var selectedModes = []
                var taggedDevelopers = []
                var taggedPublishers = []
                this.setState({
                    game: json.game,
                })

                Object.entries(json.game.genres).forEach(([id, genreName]) => {
                    selectedGenres.push({ id: id, name: genreName })
                });
                Object.entries(json.game.modes).forEach(([id, modeName]) => {
                    selectedModes.push({ id: id, name: modeName })
                });

                json.game.developers.forEach(dev => {
                    taggedDevelopers.push({ id: dev, text: dev })
                });
                json.game.publishers.forEach(p => {
                    taggedPublishers.push({ id: p, text: p })
                });

                this.setState({
                    selectedGenres: selectedGenres,
                    selectedModes: selectedModes,
                    taggedDevelopers: taggedDevelopers,
                    taggedPublishers: taggedPublishers
                })

                axios({
                    method: "get",
                    responseType: 'blob',
                    url: "http://localhost:4000/v1/game/"+id+"/image",
                })
                    .then((res) => {
                        const fileImg = new File([res.data], "image");
                        var image = URL.createObjectURL(res.data)
                        var game = this.state.game
                        game.image_url = image
                        
                        this.setState({
                            game: game,
                            fileImg: fileImg,
                            isLoaded: true,
                        })
                    });
            })
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
        game.image_url = srcImage

        this.setState({
            game: game,
            fileImg: fileImg,
            edited: true
        })
        
    }

    onSelectGenre = (selectedList, selectedItem) => {
        this.setState({
            selectedGenres: selectedList,
            edited: true
        })
    }

    onRemoveGenre = (selectedList, selectedItem) => {
        this.setState({
            selectedGenres: selectedList,
            edited: true
        })
    }

    onSelectMode = (selectedList, selectedItem) => {
        this.setState({
            selectedModes: selectedList,
            edited: true
        })
    }

    onRemoveMode = (selectedList, selectedItem) => {
        this.setState({
            selectedModes: selectedList,
            edited: true
        })
    }

    handleAdditionDevelopers = (tag) => {
        var game = this.state.game
        var devs = this.state.game.developers
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
            releaseDateSelected: date,
            edited: true
        })
    }

    onStorageChange = (event) => {
        var newGame = this.state.game
        newGame.storage = parseInt(event.target.value)
        this.setState({
            game: newGame,
            edited: true
        });
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

        if (this.state.game.genres.length === 0 ||
            this.state.game.modes.length === 0 ||
            this.state.game.developers.length === 0 ||
            this.state.game.publishers.length === 0 ||
            this.state.game.release_date.length === 0 ||
            this.state.game.storage <= 0)
            return

        if (this.state.edited) {
            //post enviar
            axios({
                method: "put",
                url: "http://localhost:4000/v1/games/update/" + this.state.id,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    //handle success
                    console.log(response);
                    window.location.reload()
                })
        }
    }

    render() {
        const { game, genres, modes, isLoaded, edited, selectedGenres, selectedModes, tagged } = this.state
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
                        <img className="elementImage" src={game.image_url} />
                    </div>
                    <div>
                        <h5> Title: {game.title} </h5>
                        <br></br>
                        <p> Genre(s): </p>
                        <Multiselect
                            options={this.state.genres} // Options to display in the dropdown
                            selectedValues={this.state.selectedGenres} // Preselected value to persist in dropdown
                            onSelect={this.onSelectGenre} // Function will trigger on select event
                            onRemove={this.onRemoveGenre} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                        />
                        <br></br>
                        <p> Mode(s): </p>
                        <Multiselect
                            options={this.state.modes} // Options to display in the dropdown
                            selectedValues={this.state.selectedModes} // Preselected value to persist in dropdown
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
                        <label> Storage: </label><input type="number" value={game.storage} onChange={this.onStorageChange} /><label> GB </label>
                    </div>
                </div>
                <Link to={`/`}><button type="button" className="btn btn-primary" onClick={this.saveGame}>Save</button></Link>
            </Fragment>
        )
    }
}