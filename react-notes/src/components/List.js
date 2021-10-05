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
import './List.css';
import NotesTable from './NotesTable';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: { id: -1, title: '', content: '' },
      showContent: false
    };
  }

  render() {
    return (
      <div className="List">
        <NotesTable
          notes={ this.props.notes }
          onShowContent={ noteId => this.onShowContent(noteId) }
        />
        <div
          className={ this.state.currentNote.id === -1 ? 'd-none' : '' }
        >
          <p>
            <strong>Nota #{ this.state.currentNote.id }</strong>
          </p>
          <p>Titulo: { this.state.currentNote.title }</p>
          <p>Contenido</p>
          <p>{ this.state.currentNote.content }</p>
        </div>
      </div>
    );
  }

  onShowContent(noteId) {
    const note = this.props.notes.find(note => note.id === noteId);
    this.setState({ currentNote: note }, () => this.openModal());
  }

  openModal = () => this.setState({ showContent: true });

  clear() {
    this.setState({ currentNote: { id: -1, title: '', content: '' } });
  }
}

export default List;

List.defaultProps = {
  notes: [],
  category: ''
};
