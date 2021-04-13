/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

import { BugModel } from './bug.model.mjs';

export class BugsController {
  constructor() {
  }

  async create(req, res) {
    try {
      await BugModel.create({
        code: req.body.code,
        description: req.body.description,
        priority: req.body.priority,
        state: req.body.state
      });
      res.end();
    }
    catch (e) {
      res.status(400).send(e.message);
    }
  }

  async readAll(req, res) {
    try {
      const bugs = await BugModel.find();

      res.json(bugs);
    }
    catch (e) {
      res.status(500).send(e.message);
    }
  }
}
