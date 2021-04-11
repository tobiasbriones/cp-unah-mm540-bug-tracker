/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import 'bootstrap';
import './css/bootstrap.min.css';
import './index.html';
import './default.css';
import './index.css';

init();

function init() {
  document.querySelectorAll('.options > div')
          .forEach(el => el.addEventListener('click', onOptionClick));
}

function onOptionClick(e) {
  window.location = e.target.dataset.page;
}
