import "reflect-metadata";
import config from "./config";
import loaders from './loaders';
import express from 'express';
 
async function startServer() {
    const app = express();

    await loaders({ expressApp: app });

    const server = require('http').createServer(app);
    const io = require('socket.io')(server,{
        cors: {
          origin: '*',
          methods: ['GET', 'POST']
        }
      });
   
    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });
    
      io.on('message', (value) => {
        console.log(value)
    });

      io.on('message', (value) => {
          console.log(value)
      });

    server.listen(config.port, () => {
        console.log('listening on *:', config.port);
      });

/*
    app.listen(config.port, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Server is running in port ` + config.port);
    });
    */
}

startServer();