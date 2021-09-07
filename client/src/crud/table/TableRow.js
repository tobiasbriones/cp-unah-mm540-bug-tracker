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

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const value = this.props.value;
    const id = value.id || value.code;
    const getTdKey = name => `${ id }Td${ name }`;

    const thEl = <th scope="row" key={ getTdKey('id') }>{ id }</th>;

    const getEl = attr => attr === 'id' ? thEl : getTdEl(attr);
    const getTdEl = attr => <td key={ getTdKey(attr) }>{ value[attr] }</td>;

    return (
      <tr onClick={ this.onClick.bind(this) }>
        { this.props.cols.map(col => getEl(col.name)) }
      </tr>
    );
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.value);
    }
  }
}

export default TableRow;
