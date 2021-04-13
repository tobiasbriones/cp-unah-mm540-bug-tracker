/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { Module } from '../module.mjs';

const ROUTER_CONFIG = Object.freeze({
  path: '/qa'
});

export class QaModule extends Module {
  constructor() {
    super(ROUTER_CONFIG);
  }

  init() {}
}
