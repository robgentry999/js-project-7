import React, {Component} from 'react';
import axios from 'axios';
import apiKey from './config.js';
import{ withRouter } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoGallery from './components/PhotoGallery.js';

class App extends Component{

    constructor(){
        super();
        
        this.state = {
            gifs:[],
            history:'',
            query:'monkey'
        }
    }

    /* 
    * handles click events to perform search
    */
    handleClick = (e) =>{
        const query = e.target.id       
        this.performSearch(query); 
    }

    componentDidMount(){
       this.performSearch();            
    }

    componentDidUpdate(prevProps) {
        //if props location name dosen't match previous prop location name, perform search on last prop

        if (this.props.location.pathname !== prevProps.location.pathname) {         
          const prevSearch =  this.props.location.pathname.split("/");
          const addressBarState = prevSearch[2];
          this.performSearch(addressBarState);          
        }
    }
    
      
    performSearch = (query = 'monkey') => {

        //fetches data
        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
        .then( response => {
              
                this.setState({
                  gifs: response.data.photos.photo,
                  query: query,
                  history:`/search/${query}`  
           });
        })
      }
    
    render () {      
       
        return(
            <div className="container">
                    <SearchForm onSearch={this.performSearch} />
                    <Nav navItem={this.handleClick} />
                    <PhotoGallery  data={this.state.gifs} title={this.state.query} altTag={this.state.query}  onLoad={this.handleAddress} />    
            </div>
        );
    }
}

export default withRouter(App);