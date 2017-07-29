/*globals __dirname */

const path = require('path');
const fs = require('fs');
const attachRoutes = (app) => {
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('router.js'))
        .map((file) => path.join(__dirname, file))
        .forEach((modulePath) => {
            require(modulePath)(app);
        });

    //after the above 'fs.readdirSynk...' the below 'require's are not needed anymore
    //bacause we automaticaly load them
    // require('./routes/server.routes.js')(app);
    // require('./routes/api.routes.js').attach(app);
};

module.exports = attachRoutes;