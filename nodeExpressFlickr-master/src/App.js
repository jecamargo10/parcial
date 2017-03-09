import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';

import './App.css';

class App extends Component {




  getPics()
    {
        console.log("BUSCOOOOOOOOOOOOOO");
        axios.get(`http://www.localhost:9000/flickr/: blue`)
          .then(res => {
            const posts = res.data.data.children.map(obj => obj.data);
            this.setState({ posts });
          });
          axios.get(`http://www.localhost:9000/flickr/:`)
            .then(res => {
              const posts = res.data.data.children.map(obj => obj.data);
              this.setState({ posts });
            });
      }  



  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
