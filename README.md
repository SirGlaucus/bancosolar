# Desafio Mi Banco

En este desafío deberás desarrollar un servidor con Node que utilice el paquete pg para conectarse con PostgreSQL y utilice funciones asíncronas para hacer las consultas a la base de datos.

IMPORTANTE: Las lineas de codigo para crear la base de datos se encuentran en el archivo script.sql

### Habilidades a evaluar

 - Levantando un servidor con conexión a PostgreSQL.
 - Insertando, consultando, actualizando y eliminando registros.

### Requerimientos

- Crear una ruta POST /cancion que reciba los datos correspondientes a una canción y realice a través de una función asíncrona la inserción en la tabla repertorio.
- Crear una ruta GET /canciones que devuelva un JSON con los registros de la tabla repertorio.
- Crear una ruta PUT /cancion que reciba los datos de una canción que se desea editar, ejecuta una función asíncrona para hacer la consulta SQL correspondiente y actualice ese registro de la tabla repertorio.
- Crear una ruta DELETE /cancion que reciba por queryString el id de una canción y realiza una consulta SQL a través de una función asíncrona para eliminarla de la base de datos.

