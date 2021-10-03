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

class TeamInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.show) {
      return <div />;
    }
    return (
      <div>
        <p>
          <strong>Accede como desarrollador</strong>
        </p>
        <div>
          Entra a tu cuenta de desarrollador para ver tus proyectos de software
          y administrar tus bugs.
        </div>
      </div>
    );
  }
}

export default TeamInfo;
