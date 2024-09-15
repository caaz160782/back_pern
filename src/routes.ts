import {Router} from 'express';
import { check, param } from 'express-validator';
import { createProduct, deleteProduct, getAllProducts,getProductById, updateProduct } from './handlers/products';
import { validarErrores } from './middlewares/validarErrores';

const router =Router()
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The product ID
 *          example: 1
 *        name:
 *          type: string
 *          description: The product name
 *          example: Xbox
 *        price:
 *          type: decimal
 *          description: The product price
 *          example: 12000
 *        availability:
 *          type: boolean
 *          description: The product availability
 *          example: true
 */
/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags:
 *      - Products
 *    description: Return a lis of profucts
 *    responses:
 *        200:
 *          description: Successful response
 *          content:
 *              application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                         $ref: '#/components/schemas/Product'         
 */
 router.get('/',getAllProducts);
/**
 * @swagger
 * /api/products/{idProduct}:
 *  get:
 *    summary: Get product by product ID
 *    tags:
 *      - Products
 *    description: Returns a product
 *    parameters:
 *      - in: path
 *        name: idProduct
 *        required: true
 *        description: ID of the product to retrieve
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 */
 router.get("/:idProduct",
             param('idProduct').isInt().withMessage('id no valido'),
             validarErrores,getProductById)
/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    tags:
 *      - Products
 *    description: Creates a new product in the system
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *              type: object
 *              properties:
 *                  name:
 *                    type: string
 *                    example: "play station 5"      
 *                  price:
 *                    type: decimal
 *                    example: 15000
 *    responses:
 *      201:
 *        description: Product created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Invalid input
 */
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
/**
 * @swagger
 * /api/products/{idProduct}:
 *  patch:
 *    summary: Update an existing product
 *    tags:
 *      - Products
 *    description: Updates partial details of an existing product
 *    parameters:
 *      - in: path
 *        name: idProduct
 *        required: true
 *        description: ID of the product to update
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              price:
 *                type: number
 *              description:
 *                type: string
 *            example:
 *              name: Updated Product Name
 *              price: 99.99
 *    responses:
 *      200:
 *        description: Product updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Invalid input
 *      404:
 *        description: Product not found
 */
  router.patch('/:idProduct',// Validaciones
    param('idProduct').isInt().withMessage('id no valido'),
    check('name').notEmpty().withMessage('El nombre es obligatorio'),
    check('price').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor a 0'),  
    // Middleware que maneja los errores de validación
     validarErrores,updateProduct );  
/**
 * @swagger
 * /api/products/{idProduct}:
 *  delete:
 *    summary: Delete a product
 *    tags:
 *      - Products
 *    description: Deletes a product by its ID
 *    parameters:
 *      - in: path
 *        name: idProduct
 *        required: true
 *        description: ID of the product to delete
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Product deleted successfully
 *      404:
 *        description: Product not found
 */

  router.delete('/:idProduct',param('idProduct').isInt().withMessage('id no calido'),deleteProduct );   

  export default router