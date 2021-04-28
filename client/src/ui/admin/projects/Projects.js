/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import './Projects.css';
import React from 'react';

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: ''
    }
  }

  render() {
    return (
      <div className={ `row ${ this.state.displayClass }` }>Projects</div>
    );
  }
}

export default Projects;
