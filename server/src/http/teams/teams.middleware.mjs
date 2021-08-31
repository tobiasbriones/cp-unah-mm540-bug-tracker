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

export function teamValidate(req, res, next) {
  const team = req.body;

  if (!team) {
    return res.status(400).send('Fill all the fields');
  }
  if (!team.code || !team.name || !team.languages || !team.tech) {
    return res.status(400).send('Fill all the fields');
  }
  next();
}
