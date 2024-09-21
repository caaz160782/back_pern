import express from 'express'
import router from './routes';
import cors,{CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi  from 'swagger-ui-express';
import swaggerDocs from './config/swagger';

// Create an instance of an Express application
const server = express();

const CorsOptions:CorsOptions ={
    origin: function(origin,callback){
        if(!origin || origin === process.env.FRONT_END_URL){
            callback(null,true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(CorsOptions));
server.use(express.json());
server.use(morgan('dev'))
server.use('/api/products', router)

// Ruta para la documentación Swagger
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use('/api',(req,res)=>{
    res.json({msg:'Desde API'})
})

export default server