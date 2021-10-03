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
import { TeamModel } from './team.model.mjs';
import { BugModel } from '../bugs/bug.model.mjs';

export function teamValidate(req, res, next) {
  const team = req.body;

  if (!team) {
    return res.status(Status.BAD_REQUEST).send('Fill all the fields');
  }
  if (!team.name || !team.languages || !team.tech) {
    return res.status(Status.BAD_REQUEST).send('Fill all the fields');
  }
  next();
}

export function teamValidateAssignBug(req, res, next) {
  const dto = req.body;

  if (!dto) {
    return res.status(Status.BAD_REQUEST).send('Fill all the fields');
  }
  if (!dto.bugCode) {
    return res.status(Status.BAD_REQUEST).send('Fill all the fields');
  }
  next();
}

export async function generateTeamCode(req, res, next) {
  try {
    const result = await TeamModel.find({}).sort({ code: -1 });
    const maxCode = result[0].code;
    req.body['code'] = maxCode + 1;

    next();
  }
  catch (e) {
    Logger.internalError(e);
    res.sendStatus(Status.INTERNAL_SERVER_ERROR);
  }
}
