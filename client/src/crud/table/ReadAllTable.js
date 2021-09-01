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
import TableRow from './TableRow';
import TableHeader from './TableHeader';

class ReadAllTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const getRow = item => (
      <TableRow
        cols={ this.props.cols }
        value={ item }
        onClick={ this.props.onItemClick }
      />
    );

    return (
      <table className="table table-hover d-block w-100 mt-4 overflow-auto">
        <TableHeader cols={this.props.cols}/>

        <tbody>
          { this.props.items.map(getRow) }
        </tbody>
      </table>
    );
  }
}

export default ReadAllTable;
