/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import './Bugs.css';
import React from 'react';

class Bugs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: ''
    };
  }

  render() {
    return (
      <div className={ `row ${ this.state.displayClass }` }>Bugs</div>
    );
  }
}

export default Bugs;
