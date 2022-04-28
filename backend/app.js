const express = require('express');
const cors = require('cors')
const connect = require('./config/db.config')
const bodyParser = require('body-parser')

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

connect()
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: "*",
    })
);

app.use("/user", usersRouter);
app.use("/post", postsRouter);

module.exports = app;
