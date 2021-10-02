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
import { ProjectModel } from './project.model.mjs';
import { Logger } from '../logger.mjs';

export function projectValidate(req, res, next) {
  const project = req.body;

  if (!project) {
    return res.status(Status.BAD_REQUEST).send('Fill all the fields');
  }
  if (!project.name || !project.startDate || !project.endDate) {
    return res.status(Status.BAD_REQUEST).send('Fill all the fields');
  }
  next();
}

export async function generateProjectCode(req, res, next) {
  try {
    const result = await ProjectModel.find({}).sort({ code: -1 });
    const maxCode = result[0].code;
    req.body['code'] = maxCode + 1;

    next();
  }
  catch (e) {
    Logger.internalError(e);
    res.sendStatus(Status.INTERNAL_SERVER_ERROR);
  }
}
