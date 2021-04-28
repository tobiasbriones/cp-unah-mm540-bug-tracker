/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import './Bugs.css';
import React from 'react';
import { BugRepository } from '../../../model/bug/bug.repository.mjs';
import { TeamRepository } from '../../../model/team/team.repository.mjs';

class Bugs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: ''
    };
    this.bugRepository = new BugRepository();
    this.devTeamRepository = new TeamRepository();
  }

  render() {
    return (
      <div className={ `row ${ this.state.displayClass }` }>Bugs</div>
    );
  }
}

export default Bugs;
