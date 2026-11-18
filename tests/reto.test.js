// RETO · Pregunta 2: pruebas propias de ordenarRutas con Preparar, Ejecutar y Verificar.
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { ordenarRutas } = require('../js/app.js');

describe('RETO · ordenarRutas(lista, criterio)', () => {
  const crearLista = () => [
    { nombre: 'Zorro', precio: 100, duracionHoras: 3 },
    { nombre: 'Árbol', precio: 0, duracionHoras: 5 },
    { nombre: 'Café', precio: 50, duracionHoras: 1 },
    { nombre: 'Cafe', precio: 25, duracionHoras: 2 }
  ];

  test('ordena los nombres alfabéticamente respetando tildes', () => {
    // Preparar
    const lista = crearLista();

    // Ejecutar
    const resultado = ordenarRutas(lista, 'nombre');

    // Verificar
    assert.deepEqual(resultado.map((ruta) => ruta.nombre), ['Árbol', 'Cafe', 'Café', 'Zorro']);
  });

  test('ordena los precios de menor a mayor, incluyendo rutas gratis primero', () => {
    // Preparar
    const lista = crearLista();

    // Ejecutar
    const resultado = ordenarRutas(lista, 'precio');

    // Verificar
    assert.deepEqual(resultado.map((ruta) => ruta.precio), [0, 25, 50, 100]);
  });

  test('ordena las duraciones de menor a mayor', () => {
    // Preparar
    const lista = crearLista();

    // Ejecutar
    const resultado = ordenarRutas(lista, 'duracion');

    // Verificar
    assert.deepEqual(resultado.map((ruta) => ruta.duracionHoras), [1, 2, 3, 5]);
  });

  test('no modifica la lista original', () => {
    // Preparar
    const lista = crearLista();
    const original = [...lista];

    // Ejecutar
    const resultado = ordenarRutas(lista, 'precio');

    // Verificar
    assert.deepEqual(lista, original);
    assert.notEqual(resultado, lista);
  });

  test('con un criterio desconocido devuelve una copia en el mismo orden', () => {
    // Preparar
    const lista = crearLista();

    // Ejecutar
    const resultado = ordenarRutas(lista, 'distancia');

    // Verificar
    assert.deepEqual(resultado, lista);
    assert.notEqual(resultado, lista);
  });

  test('con una lista vacía devuelve otra lista vacía', () => {
    // Preparar
    const lista = [];

    // Ejecutar
    const resultado = ordenarRutas(lista, 'precio');

    // Verificar
    assert.deepEqual(resultado, []);
    assert.notEqual(resultado, lista);
  });
});
