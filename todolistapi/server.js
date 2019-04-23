    const express = require('express');
    const app = express();
    const port = 3200;
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const todoListRoutes = require('./api/routes/todoListRoutes');
    const config = require('./DB');

mongoose.connect(config.DB).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database' +err)
    });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('',todoListRoutes);

app.listen(port);
