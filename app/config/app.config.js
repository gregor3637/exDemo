/*globals __dirname */
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const configApp = (app) => {
    //kakvi request-i se pravqt kam server-a
    app.set('view engine', 'pug');

    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //custom middleware, koito shte se izpalnqva predi vsichki routes
    app.use((req, res, done) => {
        req.user = {
            username: 'gosho',
        };


        const start = new Date();

        //shte se izpalni pri event-a 'end' na request-a ( tozi event shte se izpalni kogato request-a svarshi)
        req.on('end', () => {
            const end = new Date();
            console.log(`------------ execution time: ${end - start}`);
        });

        done();
    });

    app.use('/libs',
        express.static(
            path.join(__dirname, '../node_modules'))
    );


    app.use('/static',
        express.static(
            path.join(__dirname, '../static'))
    );
};

module.exports = configApp;
