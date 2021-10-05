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

class NoteContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={ this.props.note.id === -1 ? 'd-none' : '' }>
        <p className="mt-5 text-center">
          <strong>Contenido</strong>
        </p>
        <p>
          <strong>Nota #{ this.props.note.id }</strong>
        </p>
        <p>Titulo: { this.props.note.title }</p>
        <p>Contenido</p>
        <p>{ this.props.note.content }</p>
      </div>
    );
  }
}

export default NoteContent;

NoteContent.defaultProps = {
  note: { id: -1, title: '', content: '' }
};
