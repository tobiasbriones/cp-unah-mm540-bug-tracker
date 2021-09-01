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
import ReadAllTable from './table/ReadAllTable';

class Crud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createFormDisplayClass: 'd-none',
      updateFormDisplayClass: 'd-none'
    };
  }

  render() {
    return (
      <div>
        <p className="text-center font-weight-bold">
          <strong>{ this.props.title }</strong>
        </p>

        <button
          className="btn btn-primary"
          type="button"
          onClick={ this.onAddNewItemButtonClick }>
          Nuevo
        </button>

        <ReadAllTable
          cols={ this.props.readAllTable.cols }
          items={ this.props.readAllTable.items }
          onItemClick={ this.props.readAllTable.onItemClick }
        />
      </div>
    );
  }

  onAddNewItemButtonClick() {
    const value = this.state.createFormDisplayClass ? '' : 'd-none';
    this.setState({ createFormDisplayClass: value, updateFormDisplayClass: 'd-none' });
  }
}

export default Crud;
