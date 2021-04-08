/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

const BugModel = require('../../database/bug.model').BugModel;

exports.BugsController = class {
  constructor() {
  }

  async create(req, res) {
    const bug = new BugModel({
      code: req.body.code,
      description: req.body.description
    });

    await bug.save();
    res.send('');
  }

  async readAll(req, res) {
    const bugs = await BugModel.find();

    res.send(bugs);
  }
};