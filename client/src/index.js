import 'bootstrap';
import './bootstrap.min.css';
import './default.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './ui/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
