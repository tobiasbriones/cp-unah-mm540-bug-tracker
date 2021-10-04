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
import List from './List';
import Top from './Top';
import { CATEGORIES, NOTES } from '../data';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.currentIndex = 5;
    this.category = CATEGORIES[0];
    this.state = {
      notes: NOTES,
    };
  }

  render() {
    return (
      <div className="App">
        <Top
          list={CATEGORIES}
          onCreateNote={note => this.onCreateNote(note)}
          onUpdateCategory={category => this.onUpdateCategory(category)}
        ></Top>
        <List notes={this.state.notes} ref={ref => (this.list = ref)}></List>
      </div>
    );
  }

  onCreateNote(note) {
    const entity = Object.assign({}, note, { id: this.nextId() });

    this.setState({ notes: [...this.state.notes, entity] }, () =>
      this.onUpdateCategory(this.category)
    );
    //this.list.setState({ notes: [...this.state.notes, entity] });

    console.log([...this.state.notes, entity]);
    alert('Nota ingresada');
  }

  onUpdateCategory(category) {
    this.category = category;
    if (category === CATEGORIES[0]) {
      this.showAllNotes();
      return;
    }
    const values = this.state.notes.filter(note => note.category === category);
    this.list.setState({ notes: values });
    this.list.clear();
  }

  showAllNotes() {
    this.list.setState({ notes: this.state.notes });
  }

  nextId() {
    const id = this.currentIndex;
    this.currentIndex++;
    return id;
  }
}

export default App;
