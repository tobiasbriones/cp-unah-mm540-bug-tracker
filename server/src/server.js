/*
 * Copyright (c) 2021 Tobias Briones. All rights reserved.
 */

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Server running on port ${ port }`);
});