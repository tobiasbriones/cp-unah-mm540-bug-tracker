/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

const BugsController = require('./bugs.controller').BugsController;

exports.init = function(router) {
  router.post('/bugs', async (req, res) => {
    const controller = new BugsController();

    await controller.create(req, res);
  });
  router.get('/bugs', async (req, res) => {
    const controller = new BugsController();

    await controller.readAll(req, res);
  });
};
