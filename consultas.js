const { Pool } = require("pg")
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    port: 5432,
    database: "bancosolar"
})

// 1. Crear una ruta POST /cancion que reciba los datos correspondientes a una canción y realice a través de una función asíncrona la inserción en la tabla repertorio.
const insertar = async (datos) => {
    const consulta = {
        text: "INSERT INTO usuarios(nombre, balance) VALUES ($1, $2) RETURNING *",
        values: datos,
    }
    try {
        const result = await pool.query(consulta)
        return result.rows[0]
    } catch (error) {
        console.log(error.code)
        return error
    }
}

// 2. Crear una ruta GET /canciones que devuelva un JSON con los registros de la tabla repertorio.
const consultar = async () => {
    // Paso 2
    try {
        const result = await pool.query("SELECT * FROM usuarios")
        return result.rows
    } catch (error) {
        // Paso 3
        console.log(error.code)
        return error
    }
}

// 3. Crear una ruta PUT /cancion que reciba los datos de una canción que se desea editar, ejecuta una función asíncrona para hacer la consulta SQL correspondiente y
// actualice ese registro de la tabla repertorio.
const editar = async (datos) => {
    const consulta = {
        text: `UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *`,
        values: datos,
    }
    try {
        const result = await pool.query(consulta)
        return result
    } catch (error) {
        console.log(error)
        return error
    }
}

// 4. Crear una ruta DELETE /cancion que reciba por queryString el id de una canción y
// realiza una consulta SQL a través de una función asíncrona para eliminarla de la base de datos.
const eliminar = async (id) => {
    try {
        const result = await pool.query(
            `DELETE FROM repertorio WHERE id = '${id}'`
        )
        return result
    } catch (error) {
        console.log(error.code)
        return error
    }
}



module.exports = { insertar, consultar, editar, eliminar}