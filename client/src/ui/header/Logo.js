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

import './Logo.css';
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <LinkContainer to="/">
          <img src="./logo192.png" alt="Logo" className="me-lg-4" />
        </LinkContainer>
      </div>
    );
  }
}

export default Header;
