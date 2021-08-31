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
      error: ''
    };
  }

  render() {
    return (
      <form id="form" onSubmit={ this.onSubmit.bind(this) }>
        <div className="form-group mb-4">
          <label htmlFor="loginInput">Login</label>
          <input id="loginInput"
                 className="form-control"
                 type="text"
                 aria-describedby="loginHelp"
                 placeholder="Enter username" />
          <small id="loginHelp" className="form-text text-muted">
            Enter your username in the login field
          </small>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="passwordInput">Password</label>
          <input id="passwordInput"
                 className="form-control"
                 type="password"
                 placeholder="Password" />
        </div>
        <button className="btn btn-primary w-100" type="submit">Login</button>

        <div id="error" className="pt-5 text-danger">{ this.state.error }</div>
      </form>
    );
  }

  async onSubmit(e) {
    e.preventDefault();
    const login = document.getElementById('loginInput').value;
    const password = document.getElementById('passwordInput').value;
    const authService = new AuthService();

    try {
      const res = await authService.authenticate(login, password);

      authService.saveLogin(res.data);
      this.onLoggedIn();
    }
    catch (err) {
      console.log(err);
      this.setError('Invalid credentials');
    }
  }

  onLoggedIn() {
    window.location.href = '/';
  }

  setError(msg) {
    this.setState({ error: msg });
  }
}

export default Login;
