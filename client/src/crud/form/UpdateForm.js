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
import Input from './Input';

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get displayClass() {
    return this.props.show ? '' : 'd-none';
  }

  render() {
    const getInput = input => {
      const { isId, name, type, label, placeholder, smallText, options } = input;
      const inputId = `${ name }-update-input`;
      return (
        <Input
          id={ inputId }
          name={ name }
          type={ type }
          value={ this.props.state[name] }
          disabled={ isId }
          label={ label }
          placeholder={ placeholder }
          smallText={ smallText }
          options={ options }
          onChange={ this.onChange.bind(this, name) }
        />
      );
    };

    return (
      <div className={ `mt-5 ${ this.displayClass }` }>
        <p className="text-center font-weight-bold">
          <strong>{ this.props.title }</strong>
        </p>

        <form className="p-0 mx-5" onSubmit={ this.onSubmit.bind(this) }>

          { this.props.inputs.map(getInput) }

          <div className="d-flex">
            <button
              className="btn btn-primary me-2"
              type="submit"
            >
              Actualizar
            </button>
            <button
              className="btn btn-danger ms-2"
              onClick={ this.onDeleteButtonClick.bind(this) }
            >
              Eliminar
            </button>
          </div>

          <div className="text-danger my-4">
            { this.props.error }
          </div>
        </form>
      </div>
    );
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.props.onSubmitClick) {
      this.props.onSubmitClick();
    }
  }

  onDeleteButtonClick() {
    if (this.props.onDeleteClick) {
      this.props.onDeleteClick();
    }
  }

  onChange(name, value) {
    if (this.props.onChange) {
      this.props.onChange(name, value);
    }
  }
}

export default UpdateForm;
