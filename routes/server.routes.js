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
            res
                .status(404)
                .send('<h1>home </h1>');
        })
        .get('/all', (req, res) => {
            res.render('all', {
                thisIsUsedIn_All_Dot_Pug: items,
            });
        })
        .get('/json', (req, res) => {
            res.send({
                id: 1,
                name: 'gosho',
                interests: [' math', 'js'],
            })
        })
        .get('/:id', (req, res) => {
            const id = parseInt(req.params.id, 10);
            const item = items.find((i) => i.id === id);

            if(!item) {
                return res.redirect('/404');
            }

             //'res' e obekt koito ni dava vazmojnost da konfigurirame response-a
             //dolniq red pravi: view-to 'details' iskame da se renderira s modela 'thisIsUsedIn_Details_Dot_Pug'
            return res.render('details', {
                thisIsUsedIn_Details_Dot_Pug: item,
            });
        });

    app.use('/', router);
}

module.exports = attach;
