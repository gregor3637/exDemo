const { Router } = require('express');
const items = [{
    id: 1,
    name: 'cuki',
}];

const attach = (app) => {
    app.use('/api/items', getRouter());
}

const getRouter = () => {
const router = new Router();
    
    router
        .get('/:id', (req, res) => {
            const id = parseInt(req.params.id, 10);
            const item = items.find((i) => i.id === id);

            if(!item) {
                return res
                    .status(404)
                    .send({
                        error: 'Not found',
                    });
            }

            return res.send(item);
        })
        //q = ...
        .get('/', (req,res) => {
            let {
                q,
                page,
                size
            } = req.query;
            let result = items;

            page = parseInt(page, 10) || 1;
            size = parseInt(size, 10) || 10;
            
            if(q) {
                q = q.toLowerCase();
                result =
                    result.filter((item) => {
                        return item.name.toLowerCase().includes(q);
                    });
            }
            
            const from = (page - 1) * size;
            const to = page * size;
            result = result.slice(from , to);
            console.log(`from: ${from}, to: ${to}`);
            res.send(result);
        })
        .post('/', (req, res) => {
            const item  = req.body
            item.id = items.length + 1;
            items.push(item);

            res.status(201)
                .send(true);
        });

        return router;
}

module.exports = attach
