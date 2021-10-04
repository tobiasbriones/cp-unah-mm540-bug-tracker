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

import './Admin.css';
import React from 'react';
import Users from './users/Users';
import Bugs from './bugs/Bugs';
import Teams from './teams/Teams';
import Projects from './projects/Projects';
import { checkUserLogin } from '../../model/auth/auth.mjs';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePage: ''
    };
  }

  render() {
    return (
      <div>
        <div className="shadow p-2 mb-2 admin-nav">
          <nav className="navbar navbar-light admin-nav">
            <form className="form-inline mx-auto">
              <button
                className="btn btn-outline-success bg-primary text-white m-2"
                type="button"
                onClick={ this.onUsersActionClick.bind(this) }
              >
                Usuarios
              </button>
              <button
                className="btn btn-outline-success bg-primary text-white m-2"
                type="button"
                onClick={ this.onBugsActionClick.bind(this) }
              >
                Bugs
              </button>
              <button
                className="btn btn-outline-success bg-primary text-white m-2"
                type="button"
                onClick={ this.onTeamsActionClick.bind(this) }
              >
                Desarrolladores
              </button>
              <button
                className="btn btn-outline-success bg-primary text-white m-2"
                type="button"
                onClick={ this.onProjectsActionClick.bind(this) }
              >
                Proyectos de Software
              </button>
            </form>
          </nav>
        </div>

        <Users visiblePage={ this.state.visiblePage } />
        <Bugs visiblePage={ this.state.visiblePage } />
        <Teams visiblePage={ this.state.visiblePage } />
        <Projects visiblePage={ this.state.visiblePage } />
      </div>
    );
  }

  componentDidMount() {
    checkUserLogin('admin');
    this.onBugsActionClick();
  }

  onUsersActionClick() {
    this.setVisiblePage('users');
  }

  onBugsActionClick() {
    this.setVisiblePage('bugs');
  }

  onTeamsActionClick() {
    this.setVisiblePage('teams');
  }

  onProjectsActionClick() {
    this.setVisiblePage('projects');
  }

  setVisiblePage(pageName) {
    this.setState({ visiblePage: pageName });
  }
}

export default Admin;
