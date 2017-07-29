/*globals __dirname */
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
//kakvi request-i se pravqt kam server-a
app.set('view engine', 'pug');

app.use(morgan('combined')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

let start;
//custom middleware, koito shte se izpalnqva predi vsichki routes
app.use((req, res , done) => {
    req.user = {
        username: 'gosho',
    };
    done();
});

app.use('/libs', 
    express.static(
        path.join(__dirname, './node_modules'))
);


app.use('/static', 
    express.static(
        path.join(__dirname, './static'))
);

app.get('/404', (req,res) => {
    res.send('<h1> ERROR </h1>');
});

require('./routes/server.routes.js')(app);
require('./routes/api.routes.js').attach(app);



//below is part of custom Middleware
app.use((req, res , done) => {
    const end = new Date();
    const time = end - start;
    console.log('Execution time: ' + time);
    done();
});

//minal si prez vsichki drugi stranici
//ne si nameril takava koqto da ima handler
//t.e.: 
//require('./routes/server.routes.js')(app);) 
//i 
//require('./routes/api.routes.js').attach(app);
//tova znachi che takava stranica nqma
// sledovatelno otivash kam 404
// app.get('*', (req,res) => {
//     res.redirect('/404');
// });



app.listen(3001, () => console.log('magic happens'));