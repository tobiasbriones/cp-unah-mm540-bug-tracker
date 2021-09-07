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
import UpdateForm from './form/UpdateForm';

class Crud extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateForm: false,
      showUpdateForm: false,
      selectedItem: {},
      updateItem: {}
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
          onClick={ this.onAddNewItemButtonClick.bind(this) }
        >
          Nuevo
        </button>

        <ReadAllTable
          cols={ this.props.readAllTable.cols }
          items={ this.props.readAllTable.items }
          onItemClick={ this.onItemClick.bind(this) }
        />

        <UpdateForm
          show={ this.state.showUpdateForm }
          title={ this.props.title }
          inputs={ this.props.updateForm.inputs }
          state={ this.state.selectedItem }
          onChange={ this.onUpdateFormChange.bind(this) }
          onSubmitClick={ this.onUpdateClick.bind(this) }
          onDeleteClick={ this.onDeleteClick.bind(this) }
        />
      </div>
    );
  }

  onAddNewItemButtonClick() {
    this.setState({ showCreateForm: !this.state.showCreateForm, showUpdateForm: false });
  }

  onItemClick(item) {
    this.setState({
      showUpdateForm: true,
      showCreateForm: false,
      selectedItem: item,
      updateItem: item
    });
  }

  onUpdateFormChange(name, value) {
    const obj = this.state.updateItem;

    obj[name] = value;
    this.setState({ updateItem: obj });
  }

  onUpdateClick() {
    if (this.props.onUpdate) {
      this.props.onUpdate(this.state.updateItem);
    }
  }

  onDeleteClick() {
    if (this.props.onDelete) {
      this.props.onDelete(this.state.updateItem);
    }
  }
}

export default Crud;
