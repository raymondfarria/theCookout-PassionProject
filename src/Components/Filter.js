import React, { Component } from 'react';

export default class Filter extends Component{
    constructor(){
    super();
    }
    render() {
    let textColor = 'grey';
    let defaultStyle = {
        color: textColor,
      }
      return (
        <div style={defaultStyle}>
            <img/>
                <input type="text" onKeyDown={event => 
                this.props.onTextChange(event.target.value)}/>
            <img/>
        </div>
      );
    }
  }

