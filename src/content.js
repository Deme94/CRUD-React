import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Grid from './components/grid.js';
import Table from './components/table.js';

import OpenElement from './components/openelement.js'
import EditElement from './components/editelement.js'
import CreateElement from './components/createelement.js'

export default class Content extends Component {

  state = {
    grid: true,
  };

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);

    // const gamesJson = [
    //   { id: 1, title: "Cyberpunk 2077", url: "https://cdn.vox-cdn.com/thumbor/TcQWWcpqhZ2youutkpScYCBSggA=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22233661/Cyberpunk2077.jpg", genres: ["Action", "Shooter"], modes: ["Singleplayer"], developers: ["CD PROJEKT RED"], publishers: ["CD PROJEKT RED"], releaseDate: "2021/01/01", storage: 70, likes: 0 },
    //   { id: 2, title: "Red Dead Redemption 2", url: "https://programapilotoblog.files.wordpress.com/2018/05/red-dead-redemption-art.jpg", genres: ["Action", "Shooter", "Western"], modes: ["Singleplayer", "Multiplayer"], developers: ["Rockstar Games"], publishers: ["Rockstar Games"], releaseDate: "2018/10/26", storage: 150, likes: 0 },
    //   { id: 3, title: "Dragon Quest XI S: Echoes of an Elusive Age", url: "https://image.api.playstation.com/vulcan/img/rnd/202007/2908/Gs7x43oKubxTeDJFlly6osHT.png", genres: ["JRPG"], modes: ["Singleplayer"], developers: ["Square Enix"], publishers: ["Square Enix"], releaseDate: "2021/01/01", storage: 40, likes: 0 },
    //   { id: 4, title: "The Elder Scrolls V: Skyrim", url: "https://www.gamespot.com/a/uploads/scale_medium/1197/11970954/2359363-2225907-skyrim.png", genres: ["RPG", "Fantasy"], modes: ["Singleplayer"], developers: ["Bethesda Game Studios"], publishers: ["Bethesda Softworks"], releaseDate: "2021/01/01", storage: 12, likes: 0 },
    // ];
    this.state = {
      grid: true,
    }
  }

  handler(value) {
    this.setState({
      grid: value,
    })
  }

  render() {
    var Display = null;
    this.state.grid ? Display = Grid : Display = Table
    return (
      <Router>
        <Switch>
          <Route path="/element/:id" component={OpenElement} />
          <Route path="/editelement/:id" component={EditElement} />
          <Route path="/createelement">
            <CreateElement />
          </Route>
          <Route path="/">
            <Display handler={this.handler} grid={this.state.grid} />
          </Route>
        </Switch>
      </Router>
    );
  }
}