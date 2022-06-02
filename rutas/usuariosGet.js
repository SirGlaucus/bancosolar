const { consultarUsuario } = require("../consultas")

const usuariosGet = (res) => {
    const registros = await consultarUsuario()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(registros))
}

module.exports = usuariosGet