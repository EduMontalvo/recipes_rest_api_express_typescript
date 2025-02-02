import request from "supertest"
import server from "../../server"

describe('POST /api/recipes', () => {
    test('should create a new recipe', async () => {
        const response = await request(server).post('/api/recipes').send({
            recipe_name: "Lomo Saltado",
            quantity: 4,
            recipe_ingredient: "500g de lomo de res, 2 cucharadas de aceite, 1 cebolla roja cortada en plumas, 2 tomates cortados en gajos, 1 ají amarillo (opcional) cortado en tiras, 2 cucharadas de salsa de soja, 1 cucharada de vinagre, sal y pimienta al gusto, cilantro picado (para decorar), papas fritas (para acompañar), arroz blanco (para acompañar)",
            preparation: "Corta el lomo de res en tiras. En una sartén grande, calienta el aceite y dora la carne a fuego alto. Agrega la cebolla y el ají amarillo, y saltea por unos minutos. Incorpora los tomates y cocina por un par de minutos más. Añade la salsa de soja, el vinagre, sal y pimienta al gusto. Sirve caliente, decorado con cilantro y acompañado de papas fritas y arroz blanco."
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('error')
    })
    test('should display validation errors', async () => {
        const response = await request(server).post('/api/recipes').send({
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(7)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('should validate that the quantity is greater than 0 ', async () => {
        const response = await request(server).post('/api/recipes').send({
            recipe_name: "Lomo Saltado",
            quantity: 0,
            recipe_ingredient: "500g de lomo de res, 2 cucharadas de aceite, 1 cebolla roja cortada en plumas, 2 tomates cortados en gajos, 1 ají amarillo (opcional) cortado en tiras, 2 cucharadas de salsa de soja, 1 cucharada de vinagre, sal y pimienta al gusto, cilantro picado (para decorar), papas fritas (para acompañar), arroz blanco (para acompañar)",
            preparation: "Corta el lomo de res en tiras. En una sartén grande, calienta el aceite y dora la carne a fuego alto. Agrega la cebolla y el ají amarillo, y saltea por unos minutos. Incorpora los tomates y cocina por un par de minutos más. Añade la salsa de soja, el vinagre, sal y pimienta al gusto. Sirve caliente, decorado con cilantro y acompañado de papas fritas y arroz blanco."
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(401)
        expect(response.body.errors).not.toHaveLength(3)
    })
    test('should validate that the quantity is a number and greater than 0', async () => {
        const response = await request(server).post('/api/recipes').send({
            recipe_name: "Lomo Saltado",
            quantity: "Una Palabra",
            recipe_ingredient: "500g de lomo de res, 2 cucharadas de aceite, 1 cebolla roja cortada en plumas, 2 tomates cortados en gajos, 1 ají amarillo (opcional) cortado en tiras, 2 cucharadas de salsa de soja, 1 cucharada de vinagre, sal y pimienta al gusto, cilantro picado (para decorar), papas fritas (para acompañar), arroz blanco (para acompañar)",
            preparation: "Corta el lomo de res en tiras. En una sartén grande, calienta el aceite y dora la carne a fuego alto. Agrega la cebolla y el ají amarillo, y saltea por unos minutos. Incorpora los tomates y cocina por un par de minutos más. Añade la salsa de soja, el vinagre, sal y pimienta al gusto. Sirve caliente, decorado con cilantro y acompañado de papas fritas y arroz blanco."
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El campo quantity no puede ser un texto')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('should validate that recipe_ingrediente not empty', async () => {
        const response = await request(server).post('/api/recipes').send({
            recipe_name: "Lomo Saltado",
            quantity: 12,
            recipe_ingredient: "",
            preparation: "Corta el lomo de res en tiras. En una sartén grande, calienta el aceite y dora la carne a fuego alto. Agrega la cebolla y el ají amarillo, y saltea por unos minutos. Incorpora los tomates y cocina por un par de minutos más. Añade la salsa de soja, el vinagre, sal y pimienta al gusto. Sirve caliente, decorado con cilantro y acompañado de papas fritas y arroz blanco."
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El campo ingredient no puede ir vacio')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('should validate that recipe_ingrediente not a number', async () => {
        const response = await request(server).post('/api/recipes').send({
            recipe_name: "Lomo Saltado",
            quantity: 12,
            recipe_ingredient: 3,
            preparation: "Corta el lomo de res en tiras. En una sartén grande, calienta el aceite y dora la carne a fuego alto. Agrega la cebolla y el ají amarillo, y saltea por unos minutos. Incorpora los tomates y cocina por un par de minutos más. Añade la salsa de soja, el vinagre, sal y pimienta al gusto. Sirve caliente, decorado con cilantro y acompañado de papas fritas y arroz blanco."
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El campo recipe_ingredient no puede ser un numero')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('should validate that recipe_ingrediente not empty', async () => {
        const response = await request(server).post('/api/recipes').send({
            recipe_name: "Lomo Saltado",
            quantity: 12,
            recipe_ingredient: "500g de lomo de res, 2 cucharadas de aceite, 1 cebolla roja cortada en plumas, 2 tomates cortados en gajos, 1 ají amarillo (opcional) cortado en tiras, 2 cucharadas de salsa de soja, 1 cucharada de vinagre, sal y pimienta al gusto, cilantro picado (para decorar), papas fritas (para acompañar), arroz blanco (para acompañar)",
            preparation: ""
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El campo preparation no puede ir vacio')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('should validate that recipe_ingrediente not a number', async () => {
        const response = await request(server).post('/api/recipes').send({
            recipe_name: "Lomo Saltado",
            quantity: 12,
            recipe_ingredient: "500g de lomo de res, 2 cucharadas de aceite, 1 cebolla roja cortada en plumas, 2 tomates cortados en gajos, 1 ají amarillo (opcional) cortado en tiras, 2 cucharadas de salsa de soja, 1 cucharada de vinagre, sal y pimienta al gusto, cilantro picado (para decorar), papas fritas (para acompañar), arroz blanco (para acompañar)",
            preparation: 1
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El campo preparation no puede ser un numero')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
})
describe('GET /api/recipes', () => {
    test('should send back all recipes', async () => {
        const response = await request(server).get('/api/recipes')
        expect(response.status).toBe(200)
    })
})
describe('GET /api/recipes/:id', () => {
    test('It must verify that the ID is correct and that it exists in the recipes', async () => {
        const id = 400
        const response = await request(server).get(`/api/recipes/${id}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Receta no encontrada')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('It must verify that the ID is a number', async () => {
        const id = "numero1"
        const response = await request(server).get(`/api/recipes/${id}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El id no es valido')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
})
describe('PUT /api/recipes/:id', () => {
    test('It must update an existing recipe with valid data', async () => {
        const response = await request(server).put('/api/recipes/1').send({
            recipe_name: "Lomo Saltado",
            quantity: 4,
            recipe_ingredient: "500g de lomo de res, 2 cucharadas de aceite, 1 cebolla roja cortada en plumas, 2 tomates cortados en gajos, 1 ají amarillo (opcional) cortado en tiras, 2 cucharadas de salsa de soja, 1 cucharada de vinagre, sal y pimienta al gusto, cilantro picado (para decorar), papas fritas (para acompañar), arroz blanco (para acompañar)",
            preparation: "Corta el lomo de res en tiras. En una sartén grande, calienta el aceite y dora la carne a fuego alto. Agrega la cebolla y el ají amarillo, y saltea por unos minutos. Incorpora los tomates y cocina por un par de minutos más. Añade la salsa de soja, el vinagre, sal y pimienta al gusto. Sirve caliente, decorado con cilantro y acompañado de papas fritas y arroz blanco.",
            "revised": true
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })
    test('Should validate when the id is not correct', async () => {
        const response = await request(server).put('/api/recipes/no-valid-url').send({
            recipe_name: "Lomo Saltado",
            quantity: 4,
            recipe_ingredient: "500g de lomo de res, 2 cucharadas de aceite, 1 cebolla roja cortada en plumas, 2 tomates cortados en gajos, 1 ají amarillo (opcional) cortado en tiras, 2 cucharadas de salsa de soja, 1 cucharada de vinagre, sal y pimienta al gusto, cilantro picado (para decorar), papas fritas (para acompañar), arroz blanco (para acompañar)",
            preparation: "Corta el lomo de res en tiras. En una sartén grande, calienta el aceite y dora la carne a fuego alto. Agrega la cebolla y el ají amarillo, y saltea por unos minutos. Incorpora los tomates y cocina por un par de minutos más. Añade la salsa de soja, el vinagre, sal y pimienta al gusto. Sirve caliente, decorado con cilantro y acompañado de papas fritas y arroz blanco.",
            "revised": true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El id no es valido')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('Should display error message when id is not exist in the recipes', async () => {
        const id = 4000
        const response = await request(server).put(`/api/recipes/${id}`).send({
            recipe_name: "Lomo Saltado",
            quantity: 4,
            recipe_ingredient: "500g de lomo de res, 2 cucharadas de aceite, 1 cebolla roja cortada en plumas, 2 tomates cortados en gajos, 1 ají amarillo (opcional) cortado en tiras, 2 cucharadas de salsa de soja, 1 cucharada de vinagre, sal y pimienta al gusto, cilantro picado (para decorar), papas fritas (para acompañar), arroz blanco (para acompañar)",
            preparation: "Corta el lomo de res en tiras. En una sartén grande, calienta el aceite y dora la carne a fuego alto. Agrega la cebolla y el ají amarillo, y saltea por unos minutos. Incorpora los tomates y cocina por un par de minutos más. Añade la salsa de soja, el vinagre, sal y pimienta al gusto. Sirve caliente, decorado con cilantro y acompañado de papas fritas y arroz blanco.",
            "revised": true
        })
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Receta no encontrada')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })
    test('Should display validation error messages when updating a product', async () => {
        const response = await request(server).put('/api/recipes/1').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(8)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toBe('data')
    })
    test('should validate that the quantity is greater than 0 ', async () => {
        const response = await request(server).put('/api/recipes/1').send({
            recipe_name: "Lomo Saltado",
            quantity: 0,
            recipe_ingredient: "500g de lomo de res, 2 cucharadas de aceite, 1 cebolla roja cortada en plumas, 2 tomates cortados en gajos, 1 ají amarillo (opcional) cortado en tiras, 2 cucharadas de salsa de soja, 1 cucharada de vinagre, sal y pimienta al gusto, cilantro picado (para decorar), papas fritas (para acompañar), arroz blanco (para acompañar)",
            preparation: "Corta el lomo de res en tiras. En una sartén grande, calienta el aceite y dora la carne a fuego alto. Agrega la cebolla y el ají amarillo, y saltea por unos minutos. Incorpora los tomates y cocina por un par de minutos más. Añade la salsa de soja, el vinagre, sal y pimienta al gusto. Sirve caliente, decorado con cilantro y acompañado de papas fritas y arroz blanco.",
            "revised": true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(401)
        expect(response.body.errors).not.toHaveLength(3)
    })
    test('should validate that the quantity is a number and greater than 0', async () => {
        const response = await request(server).put('/api/recipes/1').send({
            recipe_name: "Lomo Saltado",
            quantity: "Una Palabra",
            recipe_ingredient: "500g de lomo de res, 2 cucharadas de aceite, 1 cebolla roja cortada en plumas, 2 tomates cortados en gajos, 1 ají amarillo (opcional) cortado en tiras, 2 cucharadas de salsa de soja, 1 cucharada de vinagre, sal y pimienta al gusto, cilantro picado (para decorar), papas fritas (para acompañar), arroz blanco (para acompañar)",
            preparation: "Corta el lomo de res en tiras. En una sartén grande, calienta el aceite y dora la carne a fuego alto. Agrega la cebolla y el ají amarillo, y saltea por unos minutos. Incorpora los tomates y cocina por un par de minutos más. Añade la salsa de soja, el vinagre, sal y pimienta al gusto. Sirve caliente, decorado con cilantro y acompañado de papas fritas y arroz blanco.",
            "revised": true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El campo quantity no puede ser un texto')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('should validate that recipe_ingrediente not empty', async () => {
        const response = await request(server).put('/api/recipes/1').send({
            recipe_name: "Lomo Saltado",
            quantity: 12,
            recipe_ingredient: "",
            preparation: "Corta el lomo de res en tiras. En una sartén grande, calienta el aceite y dora la carne a fuego alto. Agrega la cebolla y el ají amarillo, y saltea por unos minutos. Incorpora los tomates y cocina por un par de minutos más. Añade la salsa de soja, el vinagre, sal y pimienta al gusto. Sirve caliente, decorado con cilantro y acompañado de papas fritas y arroz blanco.",
            "revised": true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El campo ingredient no puede ir vacio')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('should validate that recipe_ingrediente not a number', async () => {
        const response = await request(server).put('/api/recipes/1').send({
            recipe_name: "Lomo Saltado",
            quantity: 12,
            recipe_ingredient: 3,
            preparation: "Corta el lomo de res en tiras. En una sartén grande, calienta el aceite y dora la carne a fuego alto. Agrega la cebolla y el ají amarillo, y saltea por unos minutos. Incorpora los tomates y cocina por un par de minutos más. Añade la salsa de soja, el vinagre, sal y pimienta al gusto. Sirve caliente, decorado con cilantro y acompañado de papas fritas y arroz blanco.",
            "revised": true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El campo recipe_ingredient no puede ser un numero')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('should validate that recipe_ingrediente not empty', async () => {
        const response = await request(server).put('/api/recipes/1').send({
            recipe_name: "Lomo Saltado",
            quantity: 12,
            recipe_ingredient: "500g de lomo de res, 2 cucharadas de aceite, 1 cebolla roja cortada en plumas, 2 tomates cortados en gajos, 1 ají amarillo (opcional) cortado en tiras, 2 cucharadas de salsa de soja, 1 cucharada de vinagre, sal y pimienta al gusto, cilantro picado (para decorar), papas fritas (para acompañar), arroz blanco (para acompañar)",
            preparation: "",
            "revised": true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El campo preparation no puede ir vacio')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('should validate that recipe_ingrediente not a number', async () => {
        const response = await request(server).put('/api/recipes/1').send({
            recipe_name: "Lomo Saltado",
            quantity: 12,
            recipe_ingredient: "500g de lomo de res, 2 cucharadas de aceite, 1 cebolla roja cortada en plumas, 2 tomates cortados en gajos, 1 ají amarillo (opcional) cortado en tiras, 2 cucharadas de salsa de soja, 1 cucharada de vinagre, sal y pimienta al gusto, cilantro picado (para decorar), papas fritas (para acompañar), arroz blanco (para acompañar)",
            preparation: 1,
            "revised": true
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El campo preparation no puede ser un numero')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
})
describe('PATCH /api/recipe/:id', () => {
    test('Should display when value revised is change,from true to false or viceversa', async () => {
        const response = await request(server).patch('/api/recipes/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })
    test('Should validate when the id is not correct', async () => {
        const response = await request(server).patch('/api/recipes/no-valid-id')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El id no es valido')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('Should display error message when id is not exist in the recipes', async () => {
        const id = 4000
        const response = await request(server).patch(`/api/recipes/${id}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Receta no encontrada')
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
})
describe('DELETE /api/recipes/:id', () => {
    test('It should display a confirmation that the recipe was deleted', async () => {
        const response = await request(server).delete('/api/recipes/1')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBe('Receta eiminada exitosamente')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('error')
    })
    test('It should display error message when id is not a number', async () => { 
        const response = await request(server).delete('/api/recipes/no-valid-id')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El id no es valido')
        
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    test('It should display error message when id is not exist in the recipes', async () => { 
        const id = 4000
        const response = await request(server).delete(`/api/recipes/${id}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Receta no encontrada')
        
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
})