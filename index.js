const http = require("http")
const url = require('url')
const fs = require('fs')


const usuarioPost = require('./rutas/usuarioPost')
const usuariosGet = require('./rutas/usuariosGet')
const usuarioPut = require('./rutas/usuarioPut')
const usuarioDelete = require('./rutas/usuarioDelete')
const transferenciaPost = require('./rutas/transferenciaPost')
const transferenciasGet = require('./rutas/transferenciasGet')

http
    .createServer(async (req, res) => {
        // Lectural del archivo HTML para el servidor
        if (req.url == "/" && req.method === "GET") {
            res.setHeader("content-type", "text/html")
            const html = fs.readFileSync("index.html", "utf8")
            res.end(html)
        }

        if ((req.url == "/usuario" && req.method === "POST")) {
            usuarioPost(res, req)
        }

        if (req.url == "/usuarios" && req.method === "GET") {
            usuariosGet(res)
        }

        if (req.url.startsWith("/usuario?") && req.method == "PUT") {
            usuarioPut(req, res, url)
        }

        if (req.url.startsWith("/usuario?") && req.method == "DELETE") {
            usuarioDelete(req, res, url)
        }

        if ((req.url == "/transferencia" && req.method === "POST")) {
            transferenciaPost(req, res)
        }

        if (req.url === "/transferencias" && req.method === "GET") {
            transferenciasGet(res)
        }
    })
    .listen(3000, console.log('Server activo en el puerto 3000'))