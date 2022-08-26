import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from '../api';
const cors = require('cors');
import config from '../config';

export default async ({ app }: { app: express.Application }) => {
  
    app.get('/status', (req, res) => { 
        res.status(200).end();
    });
  
    app.enable('trust proxy');

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(
        express.json({
            inflate: true,
            limit: '100kb',
            reviver: null,
            strict: true,
            type: 'application/json',
            verify: undefined,
        }),
    );
 
    let apipaths = routes();
    app.use(config.api.prefix, apipaths);
  
    function availableRoutes(apipaths) { 
        let items = apipaths.stack
          .filter(r => r.route)
          .map(r => {
            return {
              method: Object.keys(r.route.methods)[0].toUpperCase(),
              path: r.route.path
            };
          });

        console.log("Routes Created")
        items.forEach(element => {
          console.log("  ", element.method, element.path);
        });

    }
     
    availableRoutes(apipaths);
       
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
 
    
    return app;
};
