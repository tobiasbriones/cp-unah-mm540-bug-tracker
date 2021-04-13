/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import 'bootstrap';
import 'chart.js';
import '../bootstrap/bootstrap.min.css';
import '../default.css';
import './admin.html';
import './admin.css';
import { BugPageController } from './bug-page.controller.js';
import { UserPageController } from './user-page.controller.mjs';
import { TeamPageController } from './team-page.controller.js';
import { ProjectPageController } from './project-page.controller.js';
import { AuthService } from '../auth/auth.service.mjs';

class AdminController {
  constructor() {
    this.pages = [
      new BugPageController(),
      new UserPageController(),
      new TeamPageController(),
      new ProjectPageController()
    ];
  }

  init() {
    document.querySelector('header > h2').addEventListener('click', () => this.onHeaderClick());

    document.getElementById('actionBugs').addEventListener('click', () => this.onActionBugsClick());
    document.getElementById('actionUsers').addEventListener('click', () => this.onActionUsersClick());
    document.getElementById('actionDevelopers')
            .addEventListener('click', () => this.onActionDevsClick());
    document.getElementById('actionProjects')
            .addEventListener('click', () => this.onActionProjectsClick());

    this.pages.forEach(p => p.init());
    this.setPage(0);
  }

  onHeaderClick() {
    window.location.href = './index.html';
  }

  onActionUsersClick() {
    this.setPage(1);
  }

  onActionBugsClick() {
    this.setPage(0);
  }

  onActionDevsClick() {
    this.setPage(2);
  }

  onActionProjectsClick() {
    this.setPage(3);
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

const controller = new AdminController();

check();
controller.init();

function check() {
  const authService = new AuthService();
  const login = authService.getLogin();

  if (!login || login.role !== 'admin') {
    window.location.href = '/';
  }
}
