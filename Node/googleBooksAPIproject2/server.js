const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const apiBook = require("./app/api/book");
const apiAuthor = require("./app/api/author");
const authorRoute = require("./routes/authorroute");

const app = express();
app.use(bodyParser.json());
app.use(express.static("app/public"));
app.use('/', authorRoute);

apiBook(app, db);
apiAuthor(app, db);

db.sequelize.sync().then(() => {
  app.listen(8080, () => console.log("App listening on port 8080!"));
});


// SEQUELIZE AUTO COMMAND TO BUILD MODELS IN REVERSE
// sequelize-auto -o "./models" -d api_node_demo -h localhost -u root -p 3306 -x 'password' -e mysql