// const express = require('express');

// const app = express();

// app.use('/users', (req, res, next) => {
//   console.log('In /users!');
//   res.send('<h1>This is a dummy response for users</h1>');
// });

// app.use('/', (req, res, next) => {
//   res.send('<h1>main / page</h1>');
// });

// app.listen(3000);

const sequelize = require('./util/database');

sequelize
  .sync()
  .then(result =>{
    app.listen(3000);
  })
  .catch(err => {
      console.log(err);
  });