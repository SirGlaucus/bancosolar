const http = require("http")
const url = require('url')
const fs = require('fs')

const { consultarUsuario, editarUsuario, eliminarUsuario, insertarTransferencia, consultarTransferencia } = require("./consultas")
const usuarioPOST = require('./rutas/usuarioPOST')

http
    .createServer(async (req, res) => {
        // Lectural del archivo HTML para el servidor
        if (req.url == "/" && req.method === "GET") {
            res.setHeader("content-type", "text/html")
            const html = fs.readFileSync("index.html", "utf8")
            res.end(html)
        }

        if ((req.url == "/usuario" && req.method === "POST")) {
            usuarioPOST(res, req)
        }

        if (req.url == "/usuarios" && req.method === "GET") {
            const registros = await consultarUsuario()
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(registros))
        }

        if (req.url.startsWith("/usuario?") && req.method == "PUT") {
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

        if (req.url.startsWith("/usuario?") && req.method == "DELETE") {
            const { id } = url.parse(req.url, true).query
            const respuesta = await eliminarUsuario(id)
            res.end(JSON.stringify(respuesta))
        }

        if ((req.url == "/transferencia" && req.method === "POST")) {
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
        }

        if (req.url === "/transferencias" && req.method === "GET") {
            const registros = await consultarTransferencia()
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(registros))
        }
    })
    .listen(3000, console.log('Server activo en el puerto 3000'))