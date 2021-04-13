/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

export function projectValidate(req, res, next) {
  const project = req.body;

  if (!project) {
    return res.status(400).send('Fill all the fields');
  }
  if (!project.code || !project.name || !project.startDate || !project.endDate) {
    return res.status(400).send('Fill all the fields');
  }
  next();
}
