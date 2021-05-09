import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
  constructor(props) {
    super(props);
   
  }

 

  render() {
    return <Navbar className="header" >
     
      <h4 >Moonactive </h4>
     
    </Navbar>;
  }
}