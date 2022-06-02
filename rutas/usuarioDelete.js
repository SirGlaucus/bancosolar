const { eliminarUsuario } = require("../consultas")

const usuarioDelete = async (req, res, url) => {
    const { id } = url.parse(req.url, true).query
    const respuesta = await eliminarUsuario(id)
    res.end(JSON.stringify(respuesta))
}

module.exports = usuarioDelete
