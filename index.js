require('dotenv').config();

const { PORT = 3000} = process.env;
const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

const client = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/juicebox-dev');
client.connect();
server.use(express.json());

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});



server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });

  server.get('/background/:color', (req, res, next) => {
    res.send(`
      <body style="background: ${ req.params.color };">
        <h1>Hello World</h1>
      </body>
    `);
  });

