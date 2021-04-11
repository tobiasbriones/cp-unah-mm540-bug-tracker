/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

module.exports = env => {
  let mode = env;

  if (env !== 'dev' && env !== 'prod') {
    mode = 'prod';
    const msg = `
      Invalid build argument env: ${ env }, use 'dev' or 'prod' only.\n
      Using 'prod' production mode by default.
    `;

    console.log(msg);
  }
  return require(`./webpack/webpack.config.${ mode }`);
};
