import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Header from './header.js';
import Content from './content.js';

class App extends Component{
    render(){
      return(
        <div className="screen">
          <Header />
          <br></br>
          <Content />
        </div>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));