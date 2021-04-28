/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import './Devs.css';
import React from 'react';
import { TeamRepository } from '../../../model/team/team.repository.mjs';

class Devs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: ''
    };
    this.teamRepository = new TeamRepository();
  }

  render() {
    return (
      <div className={ `row ${ this.state.displayClass }` }>Devs</div>
    );
  }

  onPageShowed() {

  }
}

export default Devs;
