import { Request,Response } from "express";
import Product from "../models/Product.model";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({
      message: "Products retrieved successfully",
      payload: products
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return res.status(500).json({
      message: "Error en el servidor al obtener los productos",
      error: error.message,
    });
  }
}; 

export const getProductById = async (req: Request, res: Response) => {
  try {
    const {idProduct} = req.params 
    const product = await Product.findByPk(idProduct)

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product retrieved successfully",
      payload: product
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return res.status(500).json({
      message: "Error en el servidor al obtener los productos",
      error: error.message,
    });
  }
}; 

export const createProduct = async (req:Request, res:Response) => {
   try {
       const product= await Product.create(req.body)    
        res.status(201).json({
          message: "Created successfully",
          payload:  product
      })
        
      } catch (error) {
       // Mostrar error en consola para depuración
       console.error('Error al crear producto:', error);
      // Devolver una respuesta de error 500 si algo falla
      return res.status(500).json({
        message: "Error en el servidor al crear el producto",
        error: error.message, 
        });
    }
  }    

export const updateProduct = async (req:Request, res:Response) => {
    try {
      const { idProduct } = req.params;
      const [updatedRows] = await Product.update(req.body, {
        where: { id: idProduct }
      });
  
      if (updatedRows === 0) {
        return res.status(404).json({
          message: "Product not found"
        });
      }      
      const updatedProduct = await Product.findByPk(idProduct);  
      return res.status(200).json({
        message: "Product updated successfully",
        payload: updatedProduct
      });
  
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      return res.status(500).json({
        message: "Error en el servidor al actualizar el producto",
        error: error.message,
      });
    }
  }    

export const deleteProduct = async (req:Request, res:Response) => {  
  try {
    const { idProduct } = req.params;
    const deletedRows = await Product.destroy({
      where: { id: idProduct }
    });
 
    if (deletedRows === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    return res.status(500).json({
      message: "Error en el servidor al eliminar el producto",
      error: error.message,
    });
  }
}
