/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import './Home.css';
import React from 'react';
import { AuthService } from '../model/auth/auth.service.mjs';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdmin: 'd-none',
      showDev: 'd-none',
      showQa: 'd-none'
    };
  }

  render() {
    return (
      <div className="row options">
        <div className={ `col text-center ${ this.state.showAdmin }` }
             onClick={ this.onAdminClick.bind(this) }>
          <span className="material-icons">
            admin_panel_settings
          </span>
          <p>Administrador</p>
        </div>
        <div className={ `col text-center ${ this.state.showDev }` }
             onClick={ this.onDevClick.bind(this) }>
          <span className="material-icons">
            code
          </span>
          <p>
            Desarrollador
          </p>
        </div>
        <div className={ `col text-center ${ this.state.showQa }` }
             onClick={ this.onQaClick.bind(this) }>
          <span className="material-icons">
            verified
          </span>
          <p>
            QA
          </p>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const authService = new AuthService();
    const login = authService.getLogin();

    if (login) {
      const showAdmin = login.role === 'admin' ? '' : 'd-none';
      const showDev = login.role === 'dev' ? '' : 'd-none';
      const showQa = login.role === 'admin' || login.role === 'qa' ? '' : 'd-none';
      this.setState({ showAdmin: showAdmin, showDev: showDev, showQa: showQa });
    }
  }

  onAdminClick() {
    this.props.history.push('/admin');
  }

  onDevClick() {
    this.props.history.push('/dev');
  }

  onQaClick() {
    this.props.history.push('/qa');
  }
}

export default Home;
