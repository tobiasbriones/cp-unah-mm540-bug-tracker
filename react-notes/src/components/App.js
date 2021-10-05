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
import NotesList from './NotesList';
import Top from './Top';
import { CATEGORIES, NOTES } from '../data';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      category: ''
    };
    this.allNotes = NOTES;
    this.currentIndex = NOTES.length;
  }

  render() {
    return (
      <div>
        <Top
          list={ CATEGORIES }
          onCreateNote={ note => this.onCreateNote(note) }
          onUpdateCategory={ category => this.onUpdateCategory(category) }
        />
        <NotesList notes={ this.state.notes } />
      </div>
    );
  }

  componentDidMount() {
    this.setState({ notes: this.allNotes, category: CATEGORIES[0] });
  }

  onCreateNote(note) {
    const entity = Object.assign({}, note, { id: this.nextId() });

    this.allNotes.push(entity);

    if (this.state.category === CATEGORIES[0] || entity.category === this.state.category) {
      this.loadNotes(this.state.category);
    }
    alert('Nota ingresada');
  }

  onUpdateCategory(category) {
    this.setState({ category: category });
    this.loadNotes(category);
  }

  loadNotes(category) {
    if (category === CATEGORIES[0]) {
      this.showAllNotes();
      return;
    }
    const notes = this.allNotes.filter(note => note.category === category);

    this.setState({ notes: notes });
  }

  showAllNotes() {
    this.setState({ notes: this.allNotes });
  }

  nextId() {
    this.currentIndex++;
    return this.currentIndex;
  }
}

export default App;
