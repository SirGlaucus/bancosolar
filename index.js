const http = require("http")
const url = require('url')
const fs = require('fs')

const { insertar, consultar, editar, eliminar } = require("./consultas")

http
    .createServer(async (req, res) => {
        // Lectural del archivo HTML para el servidor
        if (req.url == "/" && req.method === "GET") {
            res.setHeader("content-type", "text/html")
            const html = fs.readFileSync("index.html", "utf8")
            res.end(html)
        }

        // 1. Crear una ruta POST /cancion que reciba los datos correspondientes a una canción y realice a través de una función asíncrona la inserción en la tabla repertorio.
        if ((req.url == "/usuario" && req.method === "POST")) {
            let body = ""
            req.on("data", (chunk) => {
                body += chunk
            })

            req.on("end", async () => {
                console.log(body)
                const bodyObject = JSON.parse(body)
                const datos = [bodyObject.nombre, bodyObject.balance]

                const respuesta = await insertar(datos)

                res.writeHead(201, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(respuesta))
            })
        }

        // 2. Crear una ruta GET /canciones que devuelva un JSON con los registros de la tabla repertorio.
        if (req.url == "/usuarios" && req.method === "GET") {
            const registros = await consultar()
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(registros))
        }

        // 3. Crear una ruta PUT /cancion que reciba los datos de una canción que se desea editar, ejecuta una función asíncrona para hacer la consulta SQL correspondiente y
        // actualice ese registro de la tabla repertorio.
        if (req.url.startsWith("/usuario?") && req.method == "PUT") {
            let body = ""
            const { id } = url.parse(req.url, true).query

            req.on("data", (chunk) => {
                body += chunk
            })

            req.on("end", async () => {
                const bodyObject = JSON.parse(body)
                const datos = [bodyObject.name, bodyObject.balance, id]
                const respuesta = await editar(datos)
                res.writeHead(201, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(respuesta))
            })
        }

        // 4. Crear una ruta DELETE /cancion que reciba por queryString el id de una canción y
        // realiza una consulta SQL a través de una función asíncrona para eliminarla de la base de datos.
        if (req.url.startsWith("/usuario?") && req.method == "DELETE") {
            // Paso 3
            const { id } = url.parse(req.url, true).query
            // Paso 4
            const respuesta = await eliminar(id)
            res.end(JSON.stringify(respuesta))
        }
    })
    .listen(3000)