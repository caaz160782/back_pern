import  request  from "supertest";
import  server from "../../server";
import db from "../../config/db";
import Product from "../../models/Product.model";

beforeAll(async () => {
    await db.sync({ force: true }); // Sync the database before running tests
  });
  
describe('POST /api/products', () => {
    it('Should create a new product', async () => {
        const newProduct = {
            name: "switch -test",
            price: 8000
        };
        const response = await request(server)
            .post('/api/products')
            .send(newProduct);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Created successfully'); // Verifica el mensaje
            expect(response.body).toHaveProperty('payload'); // Verifica que el payload exista
            expect(response.body.payload).toHaveProperty('id'); // Verifica que el ID esté dentro del payload
            expect(response.body.payload.name).toBe(newProduct.name); // Verifica el nombre dentro del payload
            expect(response.body.payload.price).toBe(newProduct.price);
    });

    it('Should return 400 if product data is invalid', async () => {
        const invalidProduct = {
            name: "", // Nombre vacío, por ejemplo
            price: -5000 // Precio inválido
        };

        const response = await request(server)
            .post('/api/products')
            .send(invalidProduct);

        expect(response.status).toBe(400); // Asegura que retorne un error de validación
        expect(response.body).toHaveProperty('message'); 
        expect(response.body).toHaveProperty('errors');
    });

    it('Should return 500 if there is a server error', async () => {
        // Simula un error en la creación del producto
        // Puedes usar un mock o stub para forzar un error en la lógica de tu servidor

        // Simulación de un error en el servidor
        const mockCreateProduct = jest.spyOn(Product, 'create').mockImplementation(() => {
            throw new Error('Simulated server error');
        });

        const response = await request(server)
            .post('/api/products')
            .send({
                name: "Test Product",
                price: 1000
            });

        expect(response.status).toBe(500); // Verifica que el código de estado sea 500 (Error interno del servidor)
        expect(response.body).toHaveProperty('message', 'Error en el servidor al crear el producto'); // Mensaje de error
        expect(response.body).toHaveProperty('error', 'Simulated server error'); // Mensaje de error específico

        // Limpia el mock
        mockCreateProduct.mockRestore();
    });
});

describe('GET /api/products', () => {
    it('Should return a list of products', async () => {
        const response = await request(server).get('/api/products');

        expect(response.status).toBe(200); // Verifica el código de estado HTTP
        expect(Array.isArray(response.body.payload)).toBe(true); // Verifica que el payload sea un array

        // Verifica que al menos haya un producto en la lista (si aplica)
        if (response.body.payload.length > 0) {
            const product = response.body.payload[0]; // Toma el primer producto de la lista
            expect(product).toHaveProperty('id'); // Verifica que el producto tenga un ID
            expect(product).toHaveProperty('name'); // Verifica que el producto tenga un nombre
            expect(product).toHaveProperty('price'); // Verifica que el producto tenga un precio
            expect(product).toHaveProperty('availability'); // Verifica que tenga la propiedad 'availability'
        }
    });

    it('Should return 500 if there is a server error', async () => {
        const mockFindAll = jest.spyOn(Product, 'findAll').mockImplementation(() => {
            throw new Error('Simulated server error');
        });

        const response = await request(server)
            .get('/api/products');

        expect(response.status).toBe(500); // Verifica que el código de estado sea 500 (Error interno del servidor)
        expect(response.body).toHaveProperty('message', 'Error en el servidor al obtener los productos'); // Mensaje de error
        expect(response.body).toHaveProperty('error', 'Simulated server error'); // Mensaje de error específico

        // Limpia el mock
        mockFindAll.mockRestore();
    });
});

describe('GET /api/products/:id', () => {
    it('Should return a product by ID', async () => {
        const productId = 1; // Suponiendo que ya tienes un producto con ID 1 en la base de datos

        const response = await request(server)
            .get(`/api/products/${productId}`);

        expect(response.status).toBe(200); // Verifica que el código de estado sea 200 (OK)
        expect(response.body).toHaveProperty('payload'); // Verifica que la respuesta tenga un payload
        const product = response.body.payload;

        // Verifica que el producto tenga las propiedades esperadas
        expect(product).toHaveProperty('id', productId);
        expect(product).toHaveProperty('name'); 
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('availability');
    });

    it('Should return 404 if product is not found', async () => {
        const invalidProductId = 9999; // Un ID de producto que no existe en la base de datos

        const response = await request(server)
            .get(`/api/products/${invalidProductId}`);

        expect(response.status).toBe(404); // Verifica que el código de estado sea 404 (No encontrado)
        expect(response.body).toHaveProperty('message', 'Product not found'); // Mensaje de error esperado
    });

    it('Should return 500 if there is a server error', async () => {
        const invalidProductId = '1'; // Usa un ID de producto que pueda causar el error

        // Simula un error en la recuperación del producto
        const mockFindByPk = jest.spyOn(Product, 'findByPk').mockImplementation(() => {
            throw new Error('Simulated server error');
        });

        const response = await request(server)
            .get(`/api/products/${invalidProductId}`);

        expect(response.status).toBe(500); // Verifica que el código de estado sea 500
        expect(response.body).toHaveProperty('message', 'Error en el servidor al obtener los productos'); // Mensaje de error
        expect(response.body).toHaveProperty('error', 'Simulated server error'); // Mensaje de error específico

        // Limpia el mock
        mockFindByPk.mockRestore();
    });
});

describe('PATCH /api/products/:id', () => {
    it('Should update a product by ID', async () => {
        const productId = 1; // Asegúrate de que exista un producto con este ID en la base de datos

        const updatedProduct = {
            name: "Updated Switch",
            price: 8500,
            availability: false
        };

        const response = await request(server)
            .patch(`/api/products/${productId}`)
            .send(updatedProduct);

        expect(response.status).toBe(200); // Verifica que el código de estado sea 200 (OK)
        expect(response.body).toHaveProperty('message', 'Product updated successfully'); // Verifica el mensaje de éxito
        expect(response.body).toHaveProperty('payload'); // Verifica que la respuesta tenga un payload
        const product = response.body.payload;

        // Verifica que el producto tenga las propiedades actualizadas
        expect(product).toHaveProperty('id', productId);
        expect(product.name).toBe(updatedProduct.name); 
        expect(product.price).toBe(updatedProduct.price);
        expect(product.availability).toBe(updatedProduct.availability);
    });

    it('Should return 404 if product to update is not found', async () => {
        const invalidProductId = 9999; // Un ID de producto que no existe en la base de datos

        const updatedProduct = {
            name: "Non-existing Product",
            price: 10000,
            availability: true
        };

        const response = await request(server)
            .patch(`/api/products/${invalidProductId}`)
            .send(updatedProduct);

        expect(response.status).toBe(404); // Verifica que el código de estado sea 404 (No encontrado)
        expect(response.body).toHaveProperty('message', 'Product not found'); // Mensaje de error esperado
    });

    it('Should return 500 if there is a server error', async () => {
        const validProductId = 1; // Puedes usar un ID válido para simular el error

        // Simula un error en la actualización del producto
        const mockUpdate = jest.spyOn(Product, 'update').mockImplementation(() => {
            throw new Error('Simulated server error');
        });

        const response = await request(server)
            .patch(`/api/products/${validProductId}`)
            .send({ name: "Updated Product Name", price: 2000 });

        expect(response.status).toBe(500); // Verifica que el código de estado sea 500 (Error interno del servidor)
        expect(response.body).toHaveProperty('message', 'Error en el servidor al actualizar el producto'); // Mensaje de error
        expect(response.body).toHaveProperty('error', 'Simulated server error'); // Mensaje de error específico

        // Limpia el mock
        mockUpdate.mockRestore();
    });
});

describe('DELETE /api/products/:id', () => {
    let productId;
    beforeAll(async () => {
        // Crea un producto de prueba para usar en la prueba de eliminación
        const response = await request(server)
            .post('/api/products')
            .send({
                name: "Product to Delete",
                price: 1000,
                availability: true
            });
        productId = response.body.payload.id;
    });

    it('Should delete a product by ID', async () => {
        const response = await request(server)
            .delete(`/api/products/${productId}`);

        expect(response.status).toBe(200); // Verifica que el código de estado sea 200 (OK)
        expect(response.body).toHaveProperty('message', 'Product deleted successfully'); // Verifica el mensaje de éxito

        // Verifica que el producto ya no existe
        const getResponse = await request(server)
            .get(`/api/products/${productId}`);
        
        expect(getResponse.status).toBe(404); // Verifica que el producto no se encuentra
        expect(getResponse.body).toHaveProperty('message', 'Product not found'); // Mensaje de error esperado
    });

    it('Should return 404 if product to delete is not found', async () => {
        const invalidProductId = 9999; // Un ID de producto que no existe en la base de datos

        const response = await request(server)
            .delete(`/api/products/${invalidProductId}`);

        expect(response.status).toBe(404); // Verifica que el código de estado sea 404 (No encontrado)
        expect(response.body).toHaveProperty('message', 'Product not found'); // Mensaje de error esperado
    });

    it('Should return 500 if there is a server error', async () => {
        const validProductId = 1; // Puedes usar un ID válido para simular el error

        // Simula un error en la eliminación del producto
        const mockDestroy = jest.spyOn(Product, 'destroy').mockImplementation(() => {
            throw new Error('Simulated server error');
        });

        const response = await request(server)
            .delete(`/api/products/${validProductId}`);

        expect(response.status).toBe(500); // Verifica que el código de estado sea 500 (Error interno del servidor)
        expect(response.body).toHaveProperty('message', 'Error en el servidor al eliminar el producto'); // Mensaje de error
        expect(response.body).toHaveProperty('error', 'Simulated server error'); // Mensaje de error específico

        // Limpia el mock
        mockDestroy.mockRestore();
    });
});


