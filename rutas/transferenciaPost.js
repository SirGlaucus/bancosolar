const { insertarTransferencia } = require("../consultas")

const transferenciaPost = (req, res) =>{
    let body = ""
            req.on("data", (chunk) => {
                body += chunk
            })

            req.on("end", async () => {
                const bodyObject = JSON.parse(body)
                const datos = [bodyObject.emisor, bodyObject.receptor, bodyObject.monto]

                const respuesta = await insertarTransferencia(datos)

                res.writeHead(201, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(respuesta))
            })
}


module.exports = transferenciaPost