import express from 'express'

// Create an instance of an Express application
const server = express();

server.get('/', (req, res) => {
    res.send('Hello, World!');
  });

export default server