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
import './Add.css';
import { CATEGORIES } from '../data';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      title: '',
      content: '',
      category: ''
    };
  }

  render() {
    return (
      <div className="Add">
        <button
          type="button"
          className="btn btn-primary"
          onClick={ e => this.onAddButtonClick(e) }
        >
          Agregar
        </button>

        <form className={ this.state.show ? '' : 'd-none' }>
          <div className="mb-3">
            <label htmlFor="titleInput" className="form-label">
              Título
            </label>
            <input
              type="text"
              className="form-control"
              id="titleInput"
              value={ this.state.title }
              onChange={ e => this.onTitleChange(e) }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contentInput" className="form-label">
              Contenido
            </label>
            <input
              type="text"
              className="form-control"
              id="contentInput"
              value={ this.state.content }
              onChange={ e => this.onContentChange(e) }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryInput" className="form-label">
              Categoría
            </label>
            <select
              id="categoryInput"
              className="form-select"
              onChange={ e => this.onCategoryChange(e) }
            >
              { this.props.categories.map(this.newCategoryItem) }
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={ e => this.onSubmit(e) }
          >
            Agregar
          </button>
        </form>
      </div>
    );
  }

  onAddButtonClick(e) {
    e.preventDefault();
    this.setState({ show: !this.state.show });
  }

  onSubmit(e) {
    e.preventDefault();
    const note = {
      title: this.state.title,
      content: this.state.content,
      category: this.state.category || CATEGORIES[0]
    };

    if (this.props.onCreateNote) {
      this.props.onCreateNote(note);
    }
    this.reset();
  }

  onTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  onContentChange(e) {
    this.setState({ content: e.target.value });
  }

  onCategoryChange(e) {
    this.setState({ category: e.target.value });
  }

  newCategoryItem(value) {
    return (
      <option key={ value } value={ value }>
        { value }
      </option>
    );
  }

  reset() {
    this.setState({
      show: false,
      title: '',
      content: ''
    });
  }
}

export default Add;

Add.defaultProps = {
  categories: []
};
