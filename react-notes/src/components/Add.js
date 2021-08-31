/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import React from 'react';
import './Add.css';

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.categories = props.categories || [];
    this.state = {
      show: false,
      title: '',
      content: '',
      category: this.categories[0],
    };
  }

  render() {
    return (
      <div className="Add">
        <button
          type="button"
          className="btn btn-primary"
          onClick={e => this.onAddBtnClick(e)}
        >
          Agregar
        </button>

        <form className={this.state.show ? '' : 'd-none'}>
          <div className="mb-3">
            <label htmlFor="titleInput" className="form-label">
              Título
            </label>
            <input
              type="text"
              className="form-control"
              id="titleInput"
              onChange={e => this.onTitleChange(e)}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="contentInput" className="form-label">
              Contenido
            </label>
            <input
              type="text"
              className="form-control"
              id="contentInput"
              onChange={e => this.onContentChange(e)}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="categoryInput" className="form-label">
              Categoría
            </label>
            <select
              id="categoryInput"
              className="form-select"
              onChange={e => this.onCategoryChange(e)}
            >
              {this.categories.map(this.newCategoryItem)}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={e => this.onSubmit(e)}
          >
            Agregar
          </button>
        </form>
      </div>
    );
  }

  onAddBtnClick(e) {
    e.preventDefault();
    this.setState({ show: !this.state.show });
  }

  onSubmit(e) {
    e.preventDefault();
    const note = {
      title: this.state.title,
      content: this.state.content,
      category: this.state.category,
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
      <option key={value} value={value}>
        {value}
      </option>
    );
  }

  reset() {
    // Needs two way binding
    /*    
    this.setState({
      show: false,
      title: '',
      content: '',
      category: this.categories[0],
    });
  */
    this.setState({
      show: false,
    });
  }
}

export default Add;
