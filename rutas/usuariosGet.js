const { consultarUsuario } = require("../consultas")

const usuariosGet = async (res) => {
    try {
        const registros = await consultarUsuario()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(registros))
    } catch (error) {
        mostrarErrores(error)
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not found' }))
    }
}

module.exports = usuariosGet