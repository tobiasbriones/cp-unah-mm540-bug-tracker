/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

export function setSelected(rowEl) {
  document.querySelectorAll('table tr.selected')
          .forEach(rowEl => rowEl.classList.remove('selected'));
  rowEl.classList.add('selected');
}
