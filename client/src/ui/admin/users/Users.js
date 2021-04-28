/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import './Users.css';
import React from 'react';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: ''
    }
  }

  render() {
    return (
      <div className={`row ${this.state.displayClass}`}>Users</div>
    );
  }
}

export default Users;
