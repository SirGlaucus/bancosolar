const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    port: 5432,
    database: 'bancosolar'
})

const mostrarErrores = (error) => {
    console.log("Error código: " + error.code)
    console.log("Detalle del error: " + error.detail)
    console.log("Tabla originaria del error: " + error.table)
    console.log("Restricción violada en el campo: " + error.constraint)
}

const insertarUsuario = async (datos) => {
    const consulta = {
        text: 'INSERT INTO usuarios(nombre, balance) VALUES ($1, $2) RETURNING *',
        values: datos,
    }
    try {
        const result = await pool.query(consulta)
        return result.rows[0]
    } catch (error) {
        mostrarErrores(error)
        throw error
    }
}

const consultarUsuario = async () => {
    try {
        const result = await pool.query('SELECT * FROM usuarios')
        return result.rows
    } catch (error) {
        mostrarErrores(error)
        throw error
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
        mostrarErrores(error)
        throw error
    }
}

const eliminarUsuario = async (id) => {
    try {
        const result = await pool.query(
            `DELETE FROM usuarios WHERE id = '${id}'`
        )
        return result
    } catch (error) {
        mostrarErrores(error)
        throw error
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
        values: [datos[2], datos[1]]
    }

    try {
        if (datos[0] === datos[1]) {
            console.error('Por favor ingresar un receptor distinto')
        } else {
            await pool.query('BEGIN')
            const result = await pool.query(consultaInsertTransferencia)
            await pool.query(consultaEmisor)
            await pool.query(consultaReceptor)
            await pool.query('COMMIT')
            return result.rows[0]
        }
    } catch (error) {
        await pool.query("ROLLBACK")
        mostrarErrores(error)
        throw error
    }
}

const consultarTransferencia = async () => {
    const consulta = {
        text: 'SELECT * FROM transferencias'
    }

    try {
        const usuariosObjetos = await consultarUsuario()
        const result = await pool.query(consulta)
        const resultRows = result.rows

        const resultadoConNombres = resultRows.map((transferencia) => {
            let emisor
            let receptor
            usuariosObjetos.forEach((usuario) => {
                if (usuario.id === transferencia.emisor) {
                    emisor = usuario.nombre
                }
            })

            usuariosObjetos.forEach((usuario) => {
                if (usuario.id === transferencia.receptor) {
                    receptor = usuario.nombre
                }
            })

            return [transferencia.id, emisor, receptor, transferencia.monto]
        })

        return resultadoConNombres
    } catch (error) {
        mostrarErrores(error)
        throw error
    }
}


module.exports = { insertarUsuario, consultarUsuario, editarUsuario, eliminarUsuario, insertarTransferencia, consultarTransferencia, mostrarErrores }