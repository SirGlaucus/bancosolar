const { Pool } = require("pg")
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    port: 5432,
    database: "bancosolar"
})

const insertarUsuario = async (datos) => {
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

const consultarUsuario = async () => {
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

const editarUsuario = async (datos) => {
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

const eliminarUsuario = async (id) => {
    try {
        const result = await pool.query(
            `DELETE FROM usuarios WHERE id = '${id}'`
        )
        return result
    } catch (error) {
        console.log(error.code)
        return error
    }
}

const insertarTransferencia = async (datos) => {
    
    const consultaInsertTransferencia = {
        text: `INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, NOW()) RETURNING *`,
        values: datos
    }

    const consultaEmisor = {
        text: `UPDATE usuarios SET balance = balance - $1 WHERE id = $2 RETURNING *`,
        values: [datos[2], datos[0]]
    }

    const consultaReceptor = {
        text: `UPDATE usuarios SET balance = balance + $1 WHERE id = $2 RETURNING *`,
        values: [datos[1], datos[0]]
    }

    try {
        await pool.query('BEGIN')
        const result = await pool.query(consultaInsertTransferencia)
        await pool.query(consultaEmisor)
        await pool.query(consultaReceptor)
        await pool.query('COMMIT')
        return result.rows[0]
    } catch (error) {
        await pool.query('ROLLBACK')
        console.log(error)
        return error
    }
}



module.exports = { insertarUsuario, consultarUsuario, editarUsuario, eliminarUsuario, insertarTransferencia }