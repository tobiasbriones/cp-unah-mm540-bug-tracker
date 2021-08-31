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
import Devs from './teams/Devs';
import Projects from './projects/Projects';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.users = null;
    this.bugs = null;
    this.devs = null;
    this.projects = null;
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
                onClick={ this.onUsersActionClick.bind(this) }>
                Usuarios
              </button>
              <button
                className="btn btn-outline-success bg-primary text-white m-2"
                type="button"
                onClick={ this.onBugsActionClick.bind(this) }>
                Bugs
              </button>
              <button
                className="btn btn-outline-success bg-primary text-white m-2"
                type="button"
                onClick={ this.onDevsActionClick.bind(this) }>
                Desarrolladores
              </button>
              <button
                className="btn btn-outline-success bg-primary text-white m-2"
                type="button"
                onClick={ this.onProjectsActionClick.bind(this) }>
                Proyectos de Software
              </button>
            </form>
          </nav>
        </div>

        <Users ref={ users => {
          this.users = users;
        } } />
        <Bugs ref={ bugs => {
          this.bugs = bugs;
        } } />
        <Devs ref={ devs => {
          this.devs = devs;
        } } />
        <Projects ref={ projects => {
          this.projects = projects;
        } } />
      </div>
    );
  }

  componentDidMount() {
    this.onBugsActionClick();
  }

  onUsersActionClick() {
    this.hideAllPages();
    showPage(this.users);
  }

  onBugsActionClick() {
    this.hideAllPages();
    showPage(this.bugs);
  }

  onDevsActionClick() {
    this.hideAllPages();
    showPage(this.devs);
  }

  onProjectsActionClick() {
    this.hideAllPages();
    showPage(this.projects);
  }

  hideAllPages() {
    setPageVisible(this.users, false);
    setPageVisible(this.bugs, false);
    setPageVisible(this.devs, false);
    setPageVisible(this.projects, false);
  }
}

export default Admin;

function showPage(component) {
  setPageVisible(component, true);
}

function setPageVisible(component, visible) {
  if (visible) {
    component.setState({
      displayClass: ''
    });
    component.onPageShowed();
  }
  else {
    component.setState({
      displayClass: 'd-none'
    });
  }
}
