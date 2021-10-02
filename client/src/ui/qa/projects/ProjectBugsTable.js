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
import ReadAllTable from '../../../crud/table/ReadAllTable';

class ProjectBugsTable extends React.Component {
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
        name: 'description',
        value: 'Descripción'
      },
      {
        name: 'priority',
        value: 'Prioridad'
      },
      {
        name: 'state',
        value: 'Estado'
      },
      {
        name: 'finishDate',
        value: 'Fecha de Terminado'
      }
    ];
    const size = this.props.items.length;

    if (this.props.projectCode === -1) {
      return <div />;
    }
    return (
      <div className="col-0 col-xl-8 overflow-auto">
        <p className="text-center font-weight-bold">
          <strong>Bugs ({ size })</strong>
        </p>
        <ReadAllTable
          cols={ cols }
          items={ this.props.items }
        />
      </div>
    );
  }
}

export default ProjectBugsTable;

ProjectBugsTable.defaultProps = {
  items: []
};
