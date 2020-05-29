const express = require("express")
const next = require("next")
const bodyParser = require("body-parser")
const fileupload = require("express-fileupload")
const db = require("./models/index.ts")
const memes = require("./controllers/meme.ts")
const templates = require("./controllers/template.ts")
const users = require("./controllers/user.ts")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	const server = express()
	server.use(fileupload())
	server.use(bodyParser.json({ limit: "50mb" }))
	server.use(bodyParser.urlencoded({ extended: false }))
	db.sequelize.sync()

	server.get("/api/meme/:id", memes.findOne)

	server.post("/api/meme/create", memes.create)

	server.post("/api/meme/delete", (req, res) => {})

	server.get("/api/meme/search", (req, res) => {})

	server.get("/api/template/:id", (req, res) => {})

	server.post("/api/template/create", templates.create)

	server.get("/api/template/search", (req, res) => {})

	server.get("/api/user/:id", users.findOne)

	server.post("/api/user/create", users.create)

	server.post("/api/user/login", users.login)

	server.post("/api/user/update", users.update)

	server.post("/api/user/verify", users.verify)

	server.all("*", (req, res) => {
		return handle(req, res)
	})

	server.listen(port, (err) => {
		if (err) {
			throw err
		}
		console.log(`> Ready on http://localhost:${port}`)
	})
})
