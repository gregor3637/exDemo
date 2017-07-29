/*globals __dirname */
const express = require('express');
const app = express();

require('./config/app.config')(app);

app.get('/404', (req,res) => {
    res.send('<h1> ERROR </h1>');
});

app.get('/', (req, res) => {
    return res.render('home_In_Views');
});

require('./routes')(app);

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

module.exports = app;