import express from 'express'
import router from './routes';
// Create an instance of an Express application
const server = express();

server.use(express.json());
server.use('/api/products', router)

export default server