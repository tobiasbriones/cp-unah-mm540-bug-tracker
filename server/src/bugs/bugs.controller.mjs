/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 *
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * This file is part of Course Project at UNAH-MM540: Bug Tracker.
 *
 * This source code is licensed under the BSD-3-Clause License found in the
 * LICENSE file in the root directory of this source tree or at
 * https://opensource.org/licenses/BSD-3-Clause.
 */

import { BugModel } from './bug.model.mjs';
import { Status } from '../http.mjs';

export class BugsController {
  constructor() {
  }

  async create(req, res) {
    try {
      await BugModel.create({
        code: req.body.code,
        description: req.body.description,
        priority: req.body.priority,
        state: req.body.state,
        project: req.body._projectId
      });
      res.end();
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async readAll(req, res) {
    try {
      const bugs = await BugModel.find().populate('project');

      res.json(bugs);
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async update(req, res) {
    try {
      const code = req.params['code'];
      const bug = {
        description: req.body.description,
        priority: req.body.priority,
        state: req.body.state,
        project: req.body._projectId
      };

      await BugModel.updateOne({ code: code }, bug);
      res.sendStatus(Status.OK);
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async delete(req, res) {
    try {
      const code = req.params['code'];
      await BugModel.deleteOne({ code: code });

      res.sendStatus(Status.OK);
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async setFinished(req, res) {
    try {
      const code = req.params['id'];
      const bug = await BugModel.findOne({ code: code });

      bug.state = 'Finished';
      bug.finishDate = new Date().toISOString();
      await BugModel.updateOne({ code: code }, bug);
      res.end();
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }

  async setAssigned(req, res) {
    try {
      const code = req.params['id'];
      const bug = await BugModel.findOne({ code: code });

      bug.state = 'Assigned';
      bug.finishDate = 'En proceso';
      await BugModel.updateOne({ code: code }, bug);
      res.end();
    }
    catch (e) {
      res.status(Status.INTERNAL_SERVER_ERROR).send(e.message);
    }
  }
}
