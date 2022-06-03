# Desafio Mi Banco

El Banco Solar acaba de decidir invertir una importante suma de dinero para contratar un equipo de desarrolladores Full Stack que desarrollen un nuevo sistema de transferencias, y han anunciado que todo aquel que postule al cargo debe realizar un servidor con Node que utilice PostgreSQL para la gestión y persistencia de datos, y simular un sistema de transferencias.

El sistema debe permitir registrar nuevos usuarios con un balance inicial y basados en éstos, realizar transferencias de saldos entre ellos.


IMPORTANTE: Las lineas de codigo para crear la base de datos se encuentran en el archivo script.sql

### Habilidades a evaluar

- Conectar una base de datos PostgreSQL con Node.
- Realizar consultas DML con Node y el paquete pg.
- Realizar consultas TCL con Node y el paquete pg.
- Construir una API RESTful utilizando PostgreSQL para la persistencia de datos.
- Manejar errores.
- Manejar códigos de estado HTTP

### Requerimientos

- Utilizar el paquete pg para conectarse a PostgreSQL y realizar consultas DML para la gestión y persistencia de datos.
- Usar transacciones SQL para realizar el registro de las transferencias.
- Servir una API RESTful en el servidor con los datos de los usuarios almacenados en PostgreSQL.
- Capturar los posibles errores que puedan ocurrir a través de bloques catch o parámetros de funciones callbacks para condicionar las funciones del servidor.
- Devolver correctamente los códigos de estado según las diferentes situaciones.

