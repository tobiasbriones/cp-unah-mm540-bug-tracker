/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import './Header.css';
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar } from 'react-bootstrap-v5';
import { AuthService } from './login/auth.service.mjs';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      name: ''
    };
  }

  render() {
    return (
      <header className="shadow p-5 mb-5 mb-5 rounded">

        <Navbar className="nav" expand="lg">
          <Navbar.Brand className="text-white">Bug Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="collapse">
            <LinkContainer className={ this.state.isLogged ? '' : 'd-none' } to="/">
              <Nav.Link className="nav-item p-2 m-3">{ this.state.name }</Nav.Link>
            </LinkContainer>
            <LinkContainer className={ this.state.isLogged ? 'd-none' : '' } to="/login">
              <Nav.Link className="nav-item p-2 m-3">Login</Nav.Link>
            </LinkContainer>
            <LinkContainer className={ this.state.isLogged ? '' : 'd-none' }
                           to="/"
                           onClick={ this.onLogout.bind(this) }>
              <Nav.Link className="nav-item p-2 m-3">Logout</Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
  }

  componentDidMount() {
    const authService = new AuthService();
    const login = authService.getLogin();

    if (login) {
      this.setState({ isLogged: true, name: login.name });
    }
  }

  onLogout() {
    const authService = new AuthService();

    authService.deleteLogin();
    this.setState({ isLogged: false });
  }
}

export default Header;