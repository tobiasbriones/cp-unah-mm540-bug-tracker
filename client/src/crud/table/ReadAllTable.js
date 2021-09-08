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
        key={ getId(item) }
        cols={ this.props.cols }
        value={ item }
        selectedId={ this.props.selectedId }
        onClick={ this.onItemClick.bind(this) }
      />
    );

    const getId = item => item.id || item.code || -1;

    return (
      <table className="table table-hover d-block w-100 mt-4 overflow-auto">
        <TableHeader cols={ this.props.cols } />

        <tbody>
          { this.props.items.map(getRow) }
        </tbody>
      </table>
    );
  }

  onItemClick(item) {
    if (this.props.onItemClick) {
      this.props.onItemClick(item);
    }
  }
}

export default ReadAllTable;
