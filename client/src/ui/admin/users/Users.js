/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import './Users.css';
import React from 'react';
import { UserRepository } from '../../../model/user/user.repository.mjs';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: ''
    };
    this.userRepository = new UserRepository();
  }

  render() {
    return (
      <div className={ `row ${ this.state.displayClass }` }>Users</div>
    );
  }

  onPageShowed() {
  }

}

export default Users;
