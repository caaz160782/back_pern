import express from 'express'
import router from './routes';
import swaggerUi  from 'swagger-ui-express';
import swaggerDocs from './config/swagger';

// Create an instance of an Express application
const server = express();

server.use(express.json());
server.use('/api/products', router)

// Ruta para la documentación Swagger
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use('/api',(req,res)=>{
    res.json({msg:'Desde API'})
})

export default server