# Mis aprendizajes · Rutas del Eje

> Las pruebas automáticas dicen si tu código **funciona**. Este archivo muestra si **entiendes por qué funciona**.
> Responde con tus palabras, en 2 a 5 líneas por pregunta. No copies la documentación: explícala.
> En cada issue anota también **qué consultaste** (enlace) y **qué encontraste ahí**.
>
> Este archivo forma parte de la calificación del reto (criterio *Comprensión*).

**Aprendiz:** Andres Felipe Pinzon Del Valle

---

## Issue #1 · G1 Guía de estilo

**Consulté:** En Actividad.pdf y Diapositivas.pdf repasé el contraste. Seguí las indicaciones de [ISSUES.md](./ISSUES.md) y busqué en [estilos.css](./css/estilos.css) de dónde toma el botón el verde que aparece en el navegador.

1. **Explica:** ¿qué ventaja tiene escribir los colores como variables en `:root` en vez de escribir el hex directamente en cada regla?
   Guardé el verde en :root y ese mismo color para ver rutas y los filtros. Si quiero probar otro tono, lo cambio una vez y enseguida veo cómo queda en los dos.

2. **Experimenta y explica:** en DevTools selecciona el botón "Ver rutas", pestaña *Computed* (o *Calculado*) y busca `--bs-btn-bg`. ¿De dónde sale su valor? ¿Por qué cambiar `--bs-primary` no habría cambiado el color del botón?
   El verde viene de --eje-primario. En estilos.css dejé que --bs-btn-bg tomara ese color para el fondo de Ver rutas. Por eso el botón sigue verde aunque cambie --bs-primary.

3. **¿Qué pasaría si…** enlazas `estilos.css` ANTES de `bootstrap.min.css` en el `<head>`? Pruébalo, describe lo que ves y vuelve a dejarlo como estaba.
   Cuando puse Bootstrap de último, Ver rutas volvió a quedar azul. Las dos hojas le dan color al mismo botón y en este caso cuenta la que se carga al final. Volví a dejar estilos.css de último y el botón quedó verde otra vez.

## Issue #2 · G2 Componentes

**Consulté:** En [index.html](./index.html) seguí la conexión entre el botón y el menú que abrí en vista móvil. En [datos.js](./js/datos.js) encontré la palabra que usa el filtro para reconocer las rutas de café.

1. **Explica:** ¿qué relación hay entre `data-bs-target="#menu"` en el botón y el `id="menu"` del div? ¿Quién lee ese atributo?
   El botón lleva escrito #menu y la parte donde tengo Inicio, Rutas y Contacto tiene el nombre menu. Cuando lo toco, Bootstrap lee esa indicación y sabe cuál parte de la página debe abrir o cerrar.

2. **Experimenta:** abre y cierra el menú en un ancho de celular y observa en DevTools el atributo `aria-expanded` del botón. ¿Qué pasa con su valor? ¿Para quién es útil esa información?
   Al abrir el menú vi que aria-expanded pasó de false a true. Al cerrarlo volvió a false. Así, alguien que usa un lector de pantalla puede saber si ya tiene abiertas las opciones.

3. **¿Qué pasaría si…** en un botón de filtro escribes `data-tipo="café"` (con tilde)? Piensa en lo que hay en `datos.js` antes de responder.
   En el botón se lee Café, pero en datos.js guardé el tipo como cafe. Si pongo la tilde también en data-tipo, el filtro busca una palabra distinta de la que guardé y dejan de aparecer las dos rutas de café.

---

## Issue #3 · G3 Datos → tarjetas

**Consulté:** En [datos.js](./js/datos.js) vi qué trae cada ruta y en [app.js](./js/app.js) seguí cómo esos datos llegan a la tarjeta. Los ejercicios de la consola me ayudaron a distinguir entre formar una lista y unir sus elementos.

1. **Predice y comprueba:** antes de ejecutarlas en la consola del navegador, escribe qué crees que devuelve cada línea. Después ejecútalas y anota el resultado real.
   ```js
   [1, 2, 3].map((n) => n * 10)
   ['a', 'b', 'c'].join('')
   ['a', 'b', 'c'].join(' - ')
   rutas.map((r) => r.nombre).length
   ```
   | Línea | Mi predicción | Resultado real |
   |---|---|---|
   | 1 | [10, 20, 30] | [10, 20, 30] |
   | 2 | abc | abc |
   | 3 | a - b - c | a - b - c |
   | 4 | 11 | 11 |

2. **Experimenta y explica:** quita temporalmente `.join('')` de `pintarRutas`. ¿Qué aparece entre las tarjetas y por qué? (Pista: ¿qué hace `innerHTML` cuando le asignas un arreglo?). Vuelve a ponerlo.
   Al quitar join me salieron comas entre una tarjeta y la siguiente. Eso pasa porque cada tarjeta todavía es una parte de una lista y al pasar la lista a texto aparecen esas comas. Volví a poner join con las comillas vacías para juntar las tarjetas sin dejar nada en medio.

3. **Explica:** ¿por qué la tarjeta se escribe con comillas invertidas `` ` `` y no con comillas simples `' '`? ¿Qué hace `${ }`?
   Con las comillas invertidas puedo escribir la tarjeta en varias líneas. Donde va el título pongo ${ruta.nombre} y ahí aparece, por ejemplo, Valle de Cocora. Si usara comillas simples, en la tarjeta se leería lo mismo que escribí entre las comillas.

---

## Issue #4 · G4 Filtros y eventos

**Consulté:** En [app.js](./js/app.js) seguí lo que ocurre al tocar un filtro. Comparé las categorías de [datos.js](./js/datos.js) con las [pruebas de G4](./tests/4-filtros-y-eventos.test.js) para entender por qué la lista completa conserva sus rutas.

1. **Predice y comprueba:** después de ejecutar `filtrarPorTipo(rutas, 'cafe')` en la consola, ¿cuánto vale `rutas.length`? ¿Por qué?
   Me siguen quedando las 11 rutas. Cuando elijo Café, el filtro arma otra lista con las dos que coinciden. Por eso puedo volver a tocar Todas y ver otra vez las once.

2. **Explica el recorrido:** describe paso a paso qué pasa desde que la persona hace clic en el botón "Cultura" hasta que aparecen las tarjetas nuevas. Menciona: el evento, `estado`, `aplicarFiltros()`, `filtrarPorTipo()` y `pintarRutas()`.
   Cuando hago clic en Cultura, el evento click deja ese botón marcado y guarda la elección en estado.tipo. Después, aplicarFiltros() llama a filtrarPorTipo() para escoger las rutas de cultura. Sobre esas rutas aplica la búsqueda y el orden que elegí, y pintarRutas() muestra las tarjetas y cuántas quedaron.

3. **¿Qué pasaría si…** usas el evento `'change'` en lugar de `'input'` en el buscador? Pruébalo y describe la diferencia.
   Con input, apenas empiezo a escribir Salento ya veo que cambian las tarjetas. Con change puedo escribir la palabra entera y seguir viendo la lista anterior hasta que salgo del buscador o confirmo lo que escribí.

---

<!-- RETO · Pregunta 4: respuestas de comprensión -->
## Reto · Ordenar rutas

**Consulté:** En [RETO.md](./RETO.md) revisé cómo debían quedar las rutas al elegir precio, nombre o duración. En [mis pruebas](./tests/reto.test.js) miré qué resultado esperaba en cada caso y cómo comparar el orden de la lista antes y después.

1. **Explica:** ¿por qué `ordenarRutas` hace `const copia = [...lista]` antes de `sort()`? ¿Qué le pasaría a `rutas` si no se copia? ¿Qué prueba tuya lo demuestra?
   Hago la copia porque sort mueve las rutas dentro de la misma lista que le paso. Si le pasara rutas directamente, perdería el orden que tenían al principio. Mi prueba «no modifica la lista original» guarda ese orden y comprueba que sigue igual después de ordenar por precio.

2. **Explica:** en `copia.sort((a, b) => a.precio - b.precio)`, ¿qué significa que la función devuelva un número negativo, cero o positivo?
   Si comparo primero la ruta gratis con la que vale 25, la resta da negativo y la primera va delante. Si las comparo al revés, da positivo y la segunda pasa delante. Si da cero, cuestan lo mismo y quedan en el orden que ya tenían entre ellas.

3. **Tus pruebas:** elige una de tus pruebas y explica qué error de programación detectaría si alguien dañara la función.
   Elegí la prueba de duración. Espero que las rutas queden de 1, 2, 3 y 5 horas. Si me equivoco y las ordeno al revés, la primera sería la de 5 horas y ahí fallaría mi prueba.
