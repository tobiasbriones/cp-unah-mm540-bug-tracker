/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
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
