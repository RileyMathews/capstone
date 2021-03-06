import React, { Component } from 'react'
import { Navbar, NavbarItem, NavbarBurger, NavbarBrand, NavbarMenu, NavbarEnd } from "bloomer";
import './NavBar.css'
import url from '../api/APISettings';


/* 
    module to handle displaying and logic of using the navigation bar
    authors Riley Mathews
*/
class NavBar extends Component {

    // Storing session storage as an object in state named currentUser
    state = {
        isActive: false,
        firstName: "",
        searchType: "All"
    }

    // Making a fetch request against sessionStorage to find relevant user and storing first name in state
    componentDidMount() {
        const currentUser = sessionStorage.getItem('userId')
        if (currentUser !== null) {
            fetch(`${url}user/${currentUser}`)
                .then(r => r.json())
                .then(response => {
                    this.setState({
                        firstName: response.first_name,
                        image: response.image
                    })
                })
        }
    }

    // event handler for clicking nav drop down burger
    // sets isActive property in state to the opposite of what it currently is
    onClickNav = function (e) {
        this.setState({
            isActive: (!this.state.isActive)
        })
        if (e.target.id !== "") {
            this.props.setView(e)
        }
    }.bind(this)

    getCurrentView = function (item) {
        if (this.props.activeUser === null) {
            return false
        } else {
            return this.props.currentView === item
        }
    }.bind(this)

    render() {
        return (
            <Navbar className="is-fixed-top">
                <NavbarBrand>
                    <img className="logo" alt="logo" src="images/logo.png" />
                    <NavbarItem isHidden="desktop">{this.props.gamertag}</NavbarItem>
                    <NavbarBurger isActive={this.state.isActive} onClick={this.onClickNav} />
                </NavbarBrand>
                <NavbarMenu isActive={this.state.isActive}>
                    <NavbarItem isActive={this.getCurrentView("profile")} className="clickable" id="nav__profile" onClick={this.onClickNav}>My Profile</NavbarItem>
                    <NavbarItem isActive={this.getCurrentView("search")} className="clickable" id="nav__search" onClick={this.onClickNav}>Add Games</NavbarItem>
                    <NavbarItem isActive={this.getCurrentView("suggest")} className="clickable" id="nav__suggest" onClick={this.onClickNav}>Suggest Games</NavbarItem>
                    <NavbarItem isActive={this.getCurrentView("logout")} className="clickable" id="nav__logout" onClick={this.onClickNav}>Logout</NavbarItem>
                </NavbarMenu>
                <NavbarEnd>
                    <NavbarItem isHidden="touch">{this.props.gamertag}</NavbarItem>
                </NavbarEnd>
            </Navbar>
        )


    }
}

export default NavBar
