import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from '../api';
const cors = require('cors');
import config from '../config';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';

let swaggerFile = `${process.cwd()}/public/swagger.json`
console.log("swaggerFile" , swaggerFile)
let swaggerData = fs.readFileSync(swaggerFile, 'utf-8');
let swaggerJSON = JSON.parse(swaggerData); 
let swaggerCSS: any = fs.readFileSync((`${process.cwd()}/public/swagger.css`), 'utf8');

export default async ({ app }: { app: express.Application }) => {
  
    app.get('/status', (req, res) => { 
        res.status(200).end();
    });
  
    app.enable('trust proxy');

    // middlewares
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
    app.use(express.static("public"));
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON, null, null, swaggerCSS)); 
    
    let apipaths = routes();
    app.use(config.api.prefix, apipaths);
 
     
function apis (apipaths){
  let items = apipaths.stack
  .filter(r => r.route)
  .map(r => {
    return config.api.prefix+r.route.path
  });
  
return items;

}

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
