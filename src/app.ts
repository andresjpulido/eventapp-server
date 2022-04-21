import "reflect-metadata";
import config from "./config";
import loaders from './loaders';
import express from 'express';
 
async function startServer() {
    const app = express();

    await loaders({ expressApp: app });

    app.listen(config.port, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Server is running in port ` + config.port);
    });
}

startServer();