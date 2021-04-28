/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import './Devs.css';
import React from 'react';

class Devs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayClass: ''
    }
  }

  render() {
    return (
      <div className={ `row ${ this.state.displayClass }` }>Devs</div>
    );
  }
}

export default Devs;
