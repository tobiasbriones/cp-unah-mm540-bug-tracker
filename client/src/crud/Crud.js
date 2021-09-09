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
      selectedId: -1,
      updateItem: {}
    };
  }

  render() {
    return (
      <div>
        <p className="text-center font-weight-bold">
          <strong>{ this.props.title }</strong>
        </p>

        <div className="d-xxl-flex align-items-xxl-baseline justify-content-xxl-center col col-lg-8 col-xxl-6 m-auto">
          <div>
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
              selectedId={ this.state.selectedId }
              onItemClick={ this.onItemClick.bind(this) }
            />
          </div>

          <UpdateForm
            show={ this.state.showUpdateForm }
            title={ this.props.updateForm.title }
            inputs={ this.props.updateForm.inputs }
            error={ this.props.updateForm.error }
            state={ this.state.updateItem }
            onChange={ this.onUpdateFormChange.bind(this) }
            onSubmitClick={ this.onUpdateClick.bind(this) }
            onDeleteClick={ this.onDeleteClick.bind(this) }
          />
        </div>
      </div>
    );
  }

  onAddNewItemButtonClick() {
    this.setState({ showCreateForm: !this.state.showCreateForm, showUpdateForm: false });
  }

  onItemClick(item) {
    const isSelected = () =>
      item.id === this.state.selectedId ||
      item.code === this.state.selectedId;

    if (isSelected()) {
      this.collapse();
    }
    else {
      this.selectItem(item);
    }
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

  selectItem(item) {
    this.setState({
      showUpdateForm: true,
      showCreateForm: false,
      selectedId: item.id || item.code,
      updateItem: { ...item }
    });
  }

  collapse() {
    this.setState({
      showCreateForm: false,
      showUpdateForm: false,
      selectedId: -1,
      updateItem: {}
    });
  }
}

export default Crud;

Crud.defaultProps = {
  title: '',
  readAllTable: {
    cols: [],
    items: []
  },
  updateForm: {
    title: 'Update',
    inputs: []
  }
};
