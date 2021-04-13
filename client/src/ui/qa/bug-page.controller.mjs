/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

export class BugPageController {
  constructor() {
    this.pageEl = document.getElementById('bugsPage');
  }

  init() {
  }

  resume() {
    this.show();
  }

  show() {
    this.pageEl.classList.remove('gone');
  }

  hide() {
    this.pageEl.classList.add('gone');
  }

}
