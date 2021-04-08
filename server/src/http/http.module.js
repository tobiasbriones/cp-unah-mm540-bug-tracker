/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

const bugs = require('./bugs/bugs.module');

exports.init = function(router) {
  bugs.init(router);
};
