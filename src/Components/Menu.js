import React, { Component } from 'react'
import BurgerMenu from 'react-burger-menu';
import MenuWrap from './MenuWrap';
import Search from '../Pages/Search';
import Home from '../Pages/Home';
import {Route,NavLink,HashRouter} from "react-router-dom";



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

  export default class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
        currentMenu: 'slide',
        menuOpen: false,
        side: 'left'
        }
    }
    handleStateChange(state){
        this.setState({menuOpen: state.isOpen})
      }
   
      closeMenu(){
        this.setState({menuOpen: false})
      }
   
      toggleMenu(){
        this.setState({menuOpen: !this.state.menuOpen})
      }
   
      
  render() {
    const Menu = BurgerMenu[this.state.currentMenu];
    return (
      <HashRouter>
        <div>
          <MenuWrap wait={20}>
            <Menu styles={styles} id={this.state.currentMenu} pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
              <div>
                <ul className='Menu'>
                  <li><NavLink to="/home">Home</NavLink></li>
                  <li><NavLink to="/search">Search</NavLink></li>
                </ul>
              </div>
            </Menu>
          </MenuWrap>
          <div>
            <Route path="/home" component={Home}/>
            <Route path="/search" component={Search}/>
          </div>
        </div>
      </HashRouter>
    )
  }
}
