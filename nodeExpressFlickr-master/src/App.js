import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';

import './App.css';

var toSearch;
var lastRecentResearch;


class App extends Component {
  constructor(props) {
      super(props);



      this.state = {value: '',
      pics:[]


    };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
   this.setState({value: event.target.value});
 }

  handleSubmit(event) {
    console.log("ENTRO");
    toSearch=this.state.value;
    lastRecentResearch=toSearch
    this.getPics();
    event.preventDefault();

  }





  getPics()
    {
        console.log("BUSCOOOOOOOOOOOOOO");
            axios.get(`http://www.localhost:9000/flickr/`+toSearch)
            .then(response => {
        console.log("Busco");
this.setState({ pics: (response.data) });
          })








      }



  render() {
    return (
      <div>

      <div>

      <form onSubmit={this.handleSubmit}>
             <label>
               Pics to search:
               <input type="text" value={this.state.value} onChange={this.handleChange} />
             </label>
             <input type="submit" value="Submit" />
           </form>
           </div>

           <div class="row">
            <div class="col-md-4">
  {this.state.pics.map(pic => {
return(   <div class="thumbnail">
    <img src={'https://farm' + pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'_m.jpg'} alt="boohoo"  style={{width: 20 + '%'}}  className="img-responsive"/>
    </div>
);

            })}


            </div>
           </div>





</div>

    );
  }
}

export default App;
