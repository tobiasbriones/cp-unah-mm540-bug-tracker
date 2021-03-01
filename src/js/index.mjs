/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

init();

function init() {
  document.querySelectorAll('.options > div')
          .forEach(el => el.addEventListener('click', onOptionClick));
}

function onOptionClick(e) {
  window.location = e.target.dataset.page;
}
