const { eliminarUsuario, mostrarErrores } = require("../consultas")

const usuarioDelete = async (req, res, url) => {
    try {
        const { id } = url.parse(req.url, true).query
        const respuesta = await eliminarUsuario(id)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(respuesta))
    } catch (error) {
        mostrarErrores(error)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not found' }))
    }
}

module.exports = usuarioDelete
