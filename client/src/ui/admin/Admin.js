/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import './Admin.css';
import React from 'react';

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="shadow p-3 mb-5 admin-nav">
        <nav className="navbar navbar-light">
          <form className="form-inline mx-auto">
            <button
              className="btn btn-outline-success bg-primary text-white m-2"
              type="button">
              Usuarios
            </button>
            <button
              className="btn btn-outline-success bg-primary text-white m-2"
              type="button">
              Bugs
            </button>
            <button
              className="btn btn-outline-success bg-primary text-white m-2"
              type="button">
              Desarrolladores
            </button>
            <button
              className="btn btn-outline-success bg-primary text-white m-2"
              type="button">
              Proyectos de Software
            </button>
          </form>
        </nav>
      </div>
    )
  }
}

export default Admin;
