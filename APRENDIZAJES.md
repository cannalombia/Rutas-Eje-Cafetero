# Mis aprendizajes · Rutas del Eje

> Las pruebas automáticas dicen si tu código **funciona**. Este archivo muestra si **entiendes por qué funciona**.
> Responde con tus palabras, en 2 a 5 líneas por pregunta. No copies la documentación: explícala.
> En cada issue anota también **qué consultaste** (enlace) y **qué encontraste ahí**.
>
> Este archivo forma parte de la calificación del reto (criterio *Comprensión*).

**Aprendiz:** Andres Felipe Pinzon Del Valle

---

## Issue #1 · G1 Guía de estilo

**Consulté:** `Actividad.pdf`, `Diapositivas.pdf`, [ISSUES.md](./ISSUES.md), [estilos.css](./css/estilos.css) y DevTools → revisé cómo se definen las variables, el contraste mínimo y las variables que usa cada botón de Bootstrap.

1. **Explica:** ¿qué ventaja tiene escribir los colores como variables en `:root` en vez de escribir el hex directamente en cada regla?
   Así puedo usar el mismo color en varias partes del sitio y, si quiero cambiarlo, solo modifico su valor una vez en `:root`.

2. **Experimenta y explica:** en DevTools selecciona el botón "Ver rutas", pestaña *Computed* (o *Calculado*) y busca `--bs-btn-bg`. ¿De dónde sale su valor? ¿Por qué cambiar `--bs-primary` no habría cambiado el color del botón?
   El verde sale de `--eje-primario`, que se asigna a `--bs-btn-bg` dentro de `.btn-primary`. Cambiar `--bs-primary` no afectaría el botón porque el componente lee su propia variable `--bs-btn-bg`.

3. **¿Qué pasaría si…** enlazas `estilos.css` ANTES de `bootstrap.min.css` en el `<head>`? Pruébalo, describe lo que ves y vuelve a dejarlo como estaba.
   Al poner Bootstrap después de mi CSS, el botón dejó de verse con el verde que elegí y volvió al azul de Bootstrap. Después restablecí el orden original, con Bootstrap primero y `estilos.css` después, para conservar el diseño.

## Issue #2 · G2 Componentes

**Consulté:** [index.html](./index.html), [datos.js](./js/datos.js) y el navegador en vista móvil → revisé cómo se conecta el botón con el menú, cómo cambia `aria-expanded` y cómo está escrito el tipo `cafe`.

1. **Explica:** ¿qué relación hay entre `data-bs-target="#menu"` en el botón y el `id="menu"` del div? ¿Quién lee ese atributo?
   `data-bs-target="#menu"` apunta al elemento que tiene `id="menu"`. Bootstrap lee ese atributo cuando se pulsa el botón y abre o cierra ese bloque del menú.

2. **Experimenta:** abre y cierra el menú en un ancho de celular y observa en DevTools el atributo `aria-expanded` del botón. ¿Qué pasa con su valor? ¿Para quién es útil esa información?
   Con el menú cerrado, `aria-expanded` tenía el valor `false`. Después de abrirlo cambió a `true`; esta información permite que un lector de pantalla comunique si el menú está desplegado o cerrado.

3. **¿Qué pasaría si…** en un botón de filtro escribes `data-tipo="café"` (con tilde)? Piensa en lo que hay en `datos.js` antes de responder.
   No coincidiría con las rutas porque en `datos.js` el tipo está escrito como `cafe`, sin tilde. Como la comparación usa el valor exacto, el filtro `café` no encontraría resultados.

---

## Issue #3 · G3 Datos → tarjetas

**Consulté:** [app.js](./js/app.js), [datos.js](./js/datos.js) y la consola → comprobé cómo `map()` crea un arreglo, cómo `join()` lo une y cómo las plantillas insertan los datos de cada ruta.

1. **Predice y comprueba:** antes de ejecutarlas en la consola del navegador, escribe qué crees que devuelve cada línea. Después ejecútalas y anota el resultado real.
   ```js
   [1, 2, 3].map((n) => n * 10)
   ['a', 'b', 'c'].join('')
   ['a', 'b', 'c'].join(' - ')
   rutas.map((r) => r.nombre).length
   ```
   | Línea | Mi predicción | Resultado real |
   |---|---|---|
   | 1 | `[10, 20, 30]` | `[10, 20, 30]` |
   | 2 | `abc` | `abc` |
   | 3 | `a - b - c` | `a - b - c` |
   | 4 | `11` | `11` |

2. **Experimenta y explica:** quita temporalmente `.join('')` de `pintarRutas`. ¿Qué aparece entre las tarjetas y por qué? (Pista: ¿qué hace `innerHTML` cuando le asignas un arreglo?). Vuelve a ponerlo.
   Aparecen comas entre las tarjetas porque `map()` devuelve un arreglo. Cuando `innerHTML` recibe ese arreglo lo convierte en texto usando comas; `.join('')` une todos los fragmentos sin separadores.

3. **Explica:** ¿por qué la tarjeta se escribe con comillas invertidas `` ` `` y no con comillas simples `' '`? ¿Qué hace `${ }`?
   Las comillas invertidas permiten escribir HTML en varias líneas e insertar valores dentro del texto. `${ }` evalúa una expresión, como `ruta.nombre`, y coloca su resultado en la tarjeta.

---

## Issue #4 · G4 Filtros y eventos

**Consulté:** _enlace(s)_ → _qué encontré_

1. **Predice y comprueba:** después de ejecutar `filtrarPorTipo(rutas, 'cafe')` en la consola, ¿cuánto vale `rutas.length`? ¿Por qué?
   _Tu respuesta_

2. **Explica el recorrido:** describe paso a paso qué pasa desde que la persona hace clic en el botón "Cultura" hasta que aparecen las tarjetas nuevas. Menciona: el evento, `estado`, `aplicarFiltros()`, `filtrarPorTipo()` y `pintarRutas()`.
   _Tu respuesta_

3. **¿Qué pasaría si…** usas el evento `'change'` en lugar de `'input'` en el buscador? Pruébalo y describe la diferencia.
   _Tu respuesta_

---

<!-- RETO · Pregunta 4: respuestas de comprensión -->
## Reto · Ordenar rutas

**Consulté:** `RETO.md` y las pruebas propias de `tests/reto.test.js` → repasé las reglas del reto, la copia del arreglo, los comparadores y los casos que comprueban el resultado.

1. **Explica:** ¿por qué `ordenarRutas` hace `const copia = [...lista]` antes de `sort()`? ¿Qué le pasaría a `rutas` si no se copia? ¿Qué prueba tuya lo demuestra?
   `sort()` cambia el mismo arreglo en el que se ejecuta. Por eso primero copio `lista`: el ordenamiento no altera los datos originales ni afecta otros usos de `rutas`. La prueba “no modifica la lista original” compara la lista con su orden guardado antes de llamar a la función.

2. **Explica:** en `copia.sort((a, b) => a.precio - b.precio)`, ¿qué significa que la función devuelva un número negativo, cero o positivo?
   Un valor negativo indica que `a` va antes que `b`; uno positivo, que `b` va antes que `a`; y cero indica que tienen el mismo valor de comparación. Al restar los precios, los menores quedan primero y las rutas gratis aparecen al inicio.

3. **Tus pruebas:** elige una de tus pruebas y explica qué error de programación detectaría si alguien dañara la función.
   La prueba de duración detectaría si se ordenan de mayor a menor, si se compara otra propiedad o si se usa un criterio incorrecto: espera que las duraciones queden `[1, 2, 3, 5]`. La prueba de nombres también comprueba que las tildes se ordenen con la comparación en español.
