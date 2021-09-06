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

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    let component;

    if (this.props.type === 'select') {
      component = this.getSelectInputComponent();
    }
    else {
      component = this.getInputComponent();
    }
    return component;
  }

  getInputComponent = () => {
    const { id, name, value, type, disabled, label, placeholder, smallText } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={ id }>
          { label }
        </label>
        <input
          id={ id }
          name={ name }
          className="form-control"
          type={ type }
          disabled={ disabled }
          aria-describedby={ `${ id }Help` }
          placeholder={ placeholder }
          value={ value }
          onChange={ this.onChange.bind(this) }
        />
        <small
          id={ `${ id }Help` }
          className="form-text text-muted"
        >
          { smallText }
        </small>
      </div>
    );
  };

  getSelectInputComponent = () => {
    const { id, name, value, label } = this.props;
    const getOptionComponent = option => <option value={ option.value }>{ option.label }</option>;
    return (
      <div className="form-group">
        <label htmlFor={ id }>{ label }</label>
        <select
          id={ id }
          name={ name }
          className="form-select form-select mb-3"
          value={ value }
          onChange={ this.onChange.bind(this) }
        >
          { this.props.options.map(getOptionComponent) }
        </select>
      </div>
    );
  };

  onChange(e) {
    const value = e.target.value;

    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
}

export default Input;

Input.defaultProps = {
  options: [],
  smallText: '',
  placeholder: '',
  label: '',
  disabled: false
};
