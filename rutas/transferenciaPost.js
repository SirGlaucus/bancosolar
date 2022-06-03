const { insertarTransferencia, mostrarErrores } = require("../consultas")

const transferenciaPost = (req, res) => {
    try {
        let body = ""
        req.on("data", (chunk) => {
            body += chunk
        })

        req.on("end", async () => {
            console.log(body)
            const bodyObject = JSON.parse(body)
            const datos = [bodyObject.emisor, bodyObject.receptor, bodyObject.monto]

            const respuesta = await insertarTransferencia(datos)

            res.writeHead(201, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(respuesta))
        })
    } catch (error) {
        mostrarErrores(error)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Not found' }))
    }
}


module.exports = transferenciaPost