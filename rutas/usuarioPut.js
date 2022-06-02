const { editarUsuario } = require("../consultas")

const usuarioPut = async (req, res, url) => {
    let body = ""
    const { id } = url.parse(req.url, true).query

    req.on("data", (chunk) => {
        body += chunk
    })

    req.on("end", async () => {
        const bodyObject = JSON.parse(body)
        const datos = [bodyObject.name, bodyObject.balance, id]
        const respuesta = await editarUsuario(datos)
        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(respuesta))
    })
}

module.exports = usuarioPut
