import React, {Component} from 'react';
import apiKey from './config';
import Search from './components/Search';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import Error404 from './components/Error404';
import {Route,Routes,Navigate} from 'react-router-dom';


class App extends Component {
  state = {
    isLoading: true,
    photos:[],
    cats:[],
    dogs:[],
    computers:[]
  };

  componentDidMount(){
    // This suppose the navigation bar with pre-fetch results
    const builtinQuery =["cats","dogs","computers"];
    builtinQuery.map((query)=> this.handleSearch(query));
    // This is use to support fresh query look up when user enters the page
    sessionStorage.removeItem('query');
  }

  handleSearch = (query)=>{
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&format=json&nojsoncallback=1`; 
    this.setState((prevState)=>{
      const newState = {...prevState};
      newState.isLoading = true;
      return newState;
    });
    fetch(url)
    .then(response=>response.json())
    .then(responseJson=>{
      this.setState((prevState) =>{
        const newState = {...prevState};
        if (query === "cats"){
          newState.cats = responseJson.photos.photo;
        } else if (query === "dogs"){
          newState.dogs = responseJson.photos.photo;
        } else if (query === "computers"){
          newState.computers = responseJson.photos.photo;
        }
        else { 
          newState.photos = responseJson.photos.photo;
        }
        newState.isLoading = false;
        return newState;  
      })
    })
    .catch((err)=>console.log("Error while fetching and parsing response", err));
  }

  
  render(){
    return (
      <div>
        <Search onSearch={this.handleSearch}/>
        <Nav />
        {
          (this.state.isLoading) ? <h2>Loading ...</h2> :
          <Routes>
            <Route exact path="/" render={()=><Navigate to="/cats" />} />
            <Route path="/cats" render={()=>{
              return (<PhotoContainer photos={this.state.cats} query="Cats" />);}} />
            <Route path="/dogs" render={()=>{
              return (<PhotoContainer photos={this.state.dogs} query="Dogs" />);}} />
            <Route path="/computers" render={()=>{
              return (<PhotoContainer photos={this.state.computers} query="Computers" />);}} />
            <Route path="/search/:query" render={({match})=>{
              return (<PhotoContainer photos={this.state.photos} query={match.params.query} search={this.handleSearch}/>);}} />
            <Route element={Error404} />   
          </Routes>
        }
        
      </div>
    );
  }
}


export default App;
