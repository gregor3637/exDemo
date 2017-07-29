const { Router } = require('express');

const items = [
    {
        id: 1,
        name: "cuki"
    },
    {
        id: 2,
        name: "sasho"
    }
]

const attach = (app) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            res.render('items/all', {
                thisIsUsedIn_All_Dot_Pug: items,
            });
        })
        .get('/form', (req, res) => {
            return res.render('items/form');
        })
        .get('/:id', (req, res, next) => {
            console.log("-------------------" + req.user.username);
            const id = parseInt(req.params.id, 10);
            const item = items.find((i) => i.id === id);

            if(!item) {
                return res.redirect('/404');
            }

             //'res' e obekt koito ni dava vazmojnost da konfigurirame response-a
             //dolniq red pravi: view-to 'details' iskame da se renderira s modela 'thisIsUsedIn_Details_Dot_Pug' 
            return res.render('items/details', {
                thisIsUsedIn_Details_Dot_Pug: item,
            });
        })
        .post('/', (req, res) => {
            const item = req.body;
            console.log('@@@@@@@@@@ server.routes.js | post js> ' + JSON.stringify(item));
            item.id = items.length + 1;
            items.push(item);
            return res.redirect('/items');
        });

    app.use('/items', router);
}

module.exports = attach;
