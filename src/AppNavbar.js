import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
    // this.state = {isOpen: false};
    // this.toggle = this.toggle.bind(this);
  }

  // toggle() {
  //   this.setState({
  //     isOpen: !this.state.isOpen
  //   });
  // }

  render() {
    return <Navbar className="header" >
     
      <h4 >Monetization </h4>
     
    </Navbar>;
  }
}