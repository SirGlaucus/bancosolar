const { consultarTransferencia } = require("../consultas")

const transferenciasGet = async (res) => {

    const registros = await consultarTransferencia()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(registros))
}


module.exports = transferenciasGet