const { editarUsuario } = require("../consultas")

const usuarioPut = async (req, res, url) => {
    try {
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
    } catch (error) {
        mostrarErrores(error)
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not found' }))
    }
}

module.exports = usuarioPut
