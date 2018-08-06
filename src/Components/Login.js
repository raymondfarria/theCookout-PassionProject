import React, { Component } from 'react';
import './Login.css'
import Button from '@material-ui/core/Button';

export default class Login extends Component {
  render() {
    return (
      <div>
        <Button onClick={()=> {
            window.location = window.location.href.includes('localhost') 
            ? 'http://localhost:8888/login' 
            : 'https://backendcookout.herokuapp.com/login'}
        }
        variant="raised" color= 'primary'>
        Sign in with Spotify
        </Button>
      </div>
    )
  }
}
