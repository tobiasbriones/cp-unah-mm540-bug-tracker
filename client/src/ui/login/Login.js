/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 *
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * This file is part of Course Project at UNAH-MM540: Bug Tracker.
 *
 * This source code is licensed under the BSD-3-Clause License found in the
 * LICENSE file in the root directory of this source tree or at
 * https://opensource.org/licenses/BSD-3-Clause.
 */

import './Login.css';
import React from 'react';
import { AuthService } from '../../model/auth/auth.service.mjs';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  render() {
    return (
      <form
        className="m-2 m-sm-5 mx-md-auto col-md-8 col-lg-4"
        onSubmit={ this.onSubmit.bind(this) }
      >
        <div className="form-group mb-4">
          <label htmlFor="loginUsernameInput">Login</label>
          <input
            id="loginUsernameInput"
            className="form-control"
            type="text"
            aria-describedby="loginHelp"
            placeholder="Enter username"
            value={ this.state.username }
            onChange={ this.onUsernameChange.bind(this) }
          />
          <small id="loginUsernameHelp" className="form-text text-muted">
            Enter your username in the login field
          </small>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="loginPasswordInput">Password</label>
          <input
            id="loginPasswordInput"
            className="form-control"
            type="password"
            placeholder="Password"
            value={ this.state.password }
            onChange={ this.onPasswordChange.bind(this) }
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>

        <div id="error" className="pt-5 text-danger">
          { this.state.error }
        </div>
      </form>
    );
  }

  async onSubmit(e) {
    e.preventDefault();
    const login = this.state.username;
    const password = this.state.password;
    const authService = new AuthService();

    try {
      const res = await authService.authenticate(login, password);

      authService.saveLogin(res.data);
      this.onLoggedIn();
    }
    catch (e) {
      if (e.response && e.response.status === 401) {
        this.setError('Invalid credentials');
      }
      else {
        this.setError(e.message);
      }
    }
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  onLoggedIn() {
    window.location.href = '/';
  }

  setError(msg) {
    this.setState({ error: msg });
  }
}

export default Login;
