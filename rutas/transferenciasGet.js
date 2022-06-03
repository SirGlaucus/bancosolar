const { consultarTransferencia, mostrarErrores } = require("../consultas")

const transferenciasGet = async (res) => {
    try {
        const registros = await consultarTransferencia()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(registros))
    } catch (error) {
        mostrarErrores(error)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not found' }))
    }
}

module.exports = transferenciasGet