import {Router} from 'express';
import { check } from 'express-validator';
import { createProduct, deleteProduct, getAllProducts,getProductById, updateProduct } from './handlers/products';
import { validarErrores } from './middlewares/validarErrores';

const router =Router()

 router.get('/',getAllProducts);

 router.get("/:idProduct", getProductById)

 router.post('/', [
  // Validaciones
  check('name').notEmpty().withMessage('El nombre es obligatorio'),
  check('price').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),  
  // Middleware que maneja los errores de validación
   validarErrores
  ],createProduct)

  // router.put('/', (req, res) => {
  //   res.send('put');
  // });   

  router.patch('/:idProduct',// Validaciones
    check('name').notEmpty().withMessage('El nombre es obligatorio'),
    check('price').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),  
    // Middleware que maneja los errores de validación
     validarErrores,updateProduct );  

  router.delete('/:idProduct',deleteProduct );   

  export default router