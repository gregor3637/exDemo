const express = require('express');

const app = express();
//kakvi request-i se pravqt kam server-a
const morgan = require('morgan');
app.set('view engine', 'pug');

const bodyParser = require('body-parser');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 

require('./routes/server.routes.js')(app);
require('./routes/api.routes.js').attach(app);



//minal si prez vsichki drugi stranici
//ne si nameril takava koqto da ima handler
//t.e.: 
//require('./routes/server.routes.js')(app);) 
//i 
//require('./routes/api.routes.js').attach(app);
//tova znachi che takava stranica nqma
// sledovatelno otivash kam 404

app.get('*', (req,res) => {
    res.redirect('/404');
});


app.listen(3001, () => console.log('magic happens'));