const { insertarUsuario } = require("../consultas")

const usuarioPost = (res, req) => {
    try {
        let body = ""
        req.on("data", (chunk) => {
            body += chunk
        })

        req.on("end", async () => {
            const bodyObject = JSON.parse(body)
            const datos = [bodyObject.nombre, bodyObject.balance]

            const respuesta = await insertarUsuario(datos)

            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(respuesta))
        })
    } catch (error) {
        mostrarErrores(error)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not found' }))
    }
}

module.exports = usuarioPost