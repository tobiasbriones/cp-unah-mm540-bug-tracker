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

import React from 'react';
import ReadAllTable from '../../crud/table/ReadAllTable';

class TeamProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const cols = [
      {
        name: 'code',
        value: 'Código'
      },
      {
        name: 'name',
        value: 'Nombre'
      },
      {
        name: 'startDate',
        value: 'Fecha de Inicio'
      },
      {
        name: 'endDate',
        value: 'Fecha de Finalización'
      }
    ];

    return (
      <div>
        <p className="text-center font-weight-bold">
          <strong>Proyectos de software ({ this.props.values.length })</strong>
        </p>
        <ReadAllTable
          cols={ cols }
          items={ this.props.values }
        />
      </div>
    );
  }

  onChange(e) {
    if (this.props.onChange) {
      const value = e.target.value;

      this.props.onChange(value);
    }
  }
}

export default TeamProjects;

TeamProjects.defaultProps = {
  values: []
};
