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

class NotesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const newItem = note => (
      <tr key={ note.id }>
        <th scope="row">{ note.id }</th>
        <td>{ note.title }</td>
        <td>
          <button
            type="button"
            className="btn btn-primary"
            data-id={ note.id }
            onClick={ e => this.onShowContentButtonClick(e) }
            data-bs-toggle="modal"
            data-bs-target="#modal"
          >
            Ver contenido
          </button>
        </td>
      </tr>
    );

    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Título</th>
            <th scope="col">Contenido</th>
          </tr>
        </thead>
        <tbody>{ this.props.notes.map(newItem) }</tbody>
      </table>
    );
  }

  onShowContentButtonClick(e) {
    const id = parseInt(e.target.dataset['id']);

    if (this.props.onShowContent) {
      this.props.onShowContent(id);
    }
  }
}

export default NotesTable;

NotesTable.defaultProps = {
  notes: []
};
