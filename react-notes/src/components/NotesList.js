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
import NotesTable from './NotesTable';
import NoteContent from './NoteContent';

class NotesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNote: { id: -1, title: '', content: '' }
    };
  }

  render() {
    return (
      <div>
        <NotesTable
          notes={ this.props.notes }
          onShowContent={ noteId => this.onShowContent(noteId) }
        />
        <NoteContent note={ this.state.currentNote } />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.category !== prevProps.category) {
      this.hideNoteContent();
    }
  }

  onShowContent(noteId) {
    const note = this.props.notes.find(note => note.id === noteId);
    this.setState({ currentNote: note });
  }

  clear() {
    this.setState({ currentNote: { id: -1, title: '', content: '' } });
  }

  hideNoteContent() {
    this.setState({
      currentNote: { id: -1, title: '', content: '' }
    });
  }
}

export default NotesList;

NotesList.defaultProps = {
  notes: []
};
