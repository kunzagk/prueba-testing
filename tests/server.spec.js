const request = require("supertest");
const server = require("../index");
const Token = '123456';

describe("Operaciones CRUD de cafes", () => {
  it("Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
    const response = await request(server).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it("Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe", async () => {
    const response = (await request(server).delete("/cafes/100")).set('Authorization',Token);
    expect(response.status).toBe(404);
  });

  it("Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201", async () => {
    const newCafe = { id: 5, nombre: "Café de prueba" };
    const response = await request(server).post("/cafes").send(newCafe);
    expect(response.status).toBe(201);
  });

  it("Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
    const updatedCafe = { id: 6, nombre: "Café actualizado" };
    const response = await request(server).put("/cafes/1").send(updatedCafe);
    expect(response.status).toBe(400);
  });
});
