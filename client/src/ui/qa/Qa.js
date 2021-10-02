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

import './Qa.css';
import React from 'react';
import Projects from './projects/Projects';
import Bugs from './bugs/Bugs';

class Qa extends React.Component {
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
                onClick={ this.onProjectsActionClick.bind(this) }
              >
                Proyectos
              </button>
              <button
                className="btn btn-outline-success bg-primary text-white m-2"
                type="button"
                onClick={ this.onBugsActionClick.bind(this) }
              >
                Bugs
              </button>
            </form>
          </nav>
        </div>

        <Projects visiblePage={ this.state.visiblePage } />
        <Bugs visiblePage={ this.state.visiblePage } />
      </div>

    );
  }

  componentDidMount() {
    this.onProjectsActionClick();
  }

  onProjectsActionClick() {
    this.setVisiblePage('projects');
  }

  onBugsActionClick() {
    this.setVisiblePage('bugs');
  }

  setVisiblePage(pageName) {
    this.setState({ visiblePage: pageName });
  }
}

export default Qa;
