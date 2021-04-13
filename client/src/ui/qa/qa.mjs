/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import 'bootstrap';
import '../bootstrap/bootstrap.min.css';
import '../default.css';
import './qa.html';
import './qa.css';
import { ProjectPageController } from './project-page.controller.mjs';
import { BugPageController } from './bug-page.controller.mjs';

class QaController {
  constructor() {
    this.pages = [
      new ProjectPageController(),
      new BugPageController()
    ];
  }

  init() {
    document.querySelector('header > h2').addEventListener('click', () => this.onHeaderClick());
    document.getElementById('actionProjects')
            .addEventListener('click', () => this.onActionProjectsClick());
    document.getElementById('actionBugs').addEventListener('click', () => this.onActionBugsClick());

    this.pages.forEach(p => p.init());
    this.setPage(0);
  }

  onHeaderClick() {
    window.location.href = './index.html';
  }

  onActionProjectsClick() {
    this.setPage(0);
  }

  onActionBugsClick() {
    this.setPage(1);
  }

  setPage(page) {
    const pageController = this.pages[page];

    this.hideAllPages();
    pageController.resume();
  }

  hideAllPages() {
    this.pages.forEach(c => c.hide());
  }
}

const controller = new QaController();

controller.init();
