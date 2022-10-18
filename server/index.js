const express = require('express')
const app = express()

const PORT = 4000;

const regRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const saveRoute = require('./routes/save')
const fetchRoute = require('./routes/fetch')
const passwordchangeRoute = require('./routes/password')

app.use("/", regRoute);
app.use("/", loginRoute);
app.use("/", saveRoute);
app.use("/", fetchRoute);
app.use('/', passwordchangeRoute);

app.listen(PORT, (error) => {
    if (!error)
      console.log(
        "Server is Successfully Running, and App is listening on port " + PORT
      );
    else console.log("Error occurred, server can't start", error);
  });
