const { insertarUsuario } = require("../consultas")

const usuarioPost = (res, req) => {
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
}

module.exports = usuarioPost