import express from 'express'
import router from './routes';
// Create an instance of an Express application
const server = express();

server.use(express.json());
server.use('/api/products', router)

server.use('/api',(req,res)=>{
    res.json({msg:'Desde API'})
})

export default server