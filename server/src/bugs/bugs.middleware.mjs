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

import { Status } from '../http.mjs';
import { Logger } from '../logger.mjs';
import { BugModel } from './bug.model.mjs';
import { ProjectModel } from '../projects/project.model.mjs';

export function bugValidate(req, res, next) {
  const bug = req.body;

  if (!bug) {
    return res.status(Status.BAD_REQUEST).send('Fill all the fields');
  }
  if (!bug.description || !bug.priority || !bug.state || !bug.projectCode) {
    return res.status(Status.BAD_REQUEST).send('Fill all the fields');
  }
  if (isNaN(bug.projectCode) || bug.projectCode <= 0) {
    return res.status(Status.BAD_REQUEST).send('Fill the bug\'s project');
  }
  next();
}

export function bugAddNewState(req, res, next) {
  req.body.state = 'New';
  next();
}

export async function bugAddProjectId(req, res, next) {
  try {
    const projectCode = req.body.projectCode;
    const result = await ProjectModel.findOne({ code: projectCode }, '_id');
    req.body._projectId = result._id;

    next();
  }
  catch (e) {
    Logger.internalError(e);
    res.sendStatus(Status.INTERNAL_SERVER_ERROR);
  }
}

export async function generateBugCode(req, res, next) {
  try {
    const result = await BugModel.find({}).sort({ code: -1 });
    const maxCode = result[0].code;
    req.body['code'] = maxCode + 1;

    next();
  }
  catch (e) {
    Logger.internalError(e);
    res.sendStatus(Status.INTERNAL_SERVER_ERROR);
  }
}
