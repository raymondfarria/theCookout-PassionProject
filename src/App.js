import React, { Component } from 'react';
import './App.css';
import Menu from './Components/Menu';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import queryString from 'qs';
import BurgerMenu from 'react-burger-menu';
import Search from './Pages/Search';
import Home from './Pages/Home';
import Login from './Components/Login';
import {Route,NavLink,HashRouter} from "react-router-dom";
import {Switch} from 'react-router-dom';


let styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem:{
    display: 'block',
    fontSize: '30px',
    padding: '10px'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

const routes = [
  {
    path:'/login',
    component: Home
  },
  {
    path:'/search',
    component:Search
  }
]


class App extends Component {
  
  componentDidMount(){
    let parsed = queryString.parse(window.location.search);
    console.log(parsed);
    console.log(parsed["?access_token"])
    let accessToken = parsed["?access_token"];
    
    //Checks to see if access token is still valid. Prompts sign in button if not. 
    if(!accessToken)
     return; 

   //Fetches access token for the api
   fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.id
      }
     }))
    }
  
  
  render() {
    return (
      <div>
      <Typography variant='display1' align='center' gutterBottom>
        The Cookout
      </Typography>
      <div>
      <Menu/>
      </div>
      </div>
      
    );
      }
    }
    


          

    
    export default App;
      
         
        
       
          

    

