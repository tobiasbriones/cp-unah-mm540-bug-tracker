/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { Module } from '../module.mjs';
import { BugsController } from './bugs.controller.mjs';

const ROUTER_CONFIG = Object.freeze({
  path: '/bugs'
});

export class BugsModule extends Module {
  #controller;

  constructor() {
    super(ROUTER_CONFIG);
    this.#controller = new BugsController();
  }

  init() {
    this.router.post('/', (req, res) => this.#controller.create(req, res));
    this.router.get('/', (req, res) => this.#controller.readAll(req, res));
  }
}
