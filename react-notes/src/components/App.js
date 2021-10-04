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

const CATEGORIES = [
  'Todas',
  'Estudios',
  'Juegos',
  'Otros',
  'Trabajo',
  'Compras',
  'Ocio',
  'Vacaciones',
];

const NOTES = [
  {
    id: 1,
    title: 'Prueba de prog comercial',
    content: 'El viernes 16 es la prueba de programacion comercial',
    category: 'Estudios',
  },
  {
    id: 2,
    title: 'Nota #2',
    content:
      'Note that the Coconut option is initially selected, because of the selected attribute.',
    category: 'Compras',
  },
  {
    id: 3,
    title: 'Nota #3',
    content:
      'This is more convenient in a controlled component because you only need to update it in one place.',
    category: 'Ocio',
  },
  {
    id: 4,
    title: 'Nota #4',
    content:
      'You can pass an array into the value attribute, allowing you to select multiple options in a select tag',
    category: 'Trabajo',
  },
];

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
