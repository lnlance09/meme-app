const express = require("express")
const { check, validationResult } = require("express-validator")
const next = require("next")
const bodyParser = require("body-parser")
const db = require("./models/index.ts")
const memes = require("./controllers/meme.ts")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	const server = express()
	server.use(bodyParser.json())

	db.sequelize.sync()
	// const jsonParser = bodyParser.json()
	// const urlencodedParser = bodyParser.urlencoded({ extended: false })

	server.post("/api/meme/create", memes.create)

	server.post("/api/meme/delete", (req, res) => {
		console.log("delete meme")
		console.log(req.body)
		// console.log(res)
	})

	server.get("/api/template/:id", (req, res) => {
		console.log("search template")
		console.log(req)
		console.log(res)
	})

	server.post("/api/template/create", (req, res) => {
		console.log("create template")
		console.log(req)
		console.log(res)
	})

	server.get("/api/template/search", (req, res) => {
		console.log("search template")
		console.log(req)
		console.log(res)
	})

	server.post("/api/user/create", (req, res) => {
		console.log("create user")
		console.log(req)
		console.log(res)
	})

	server.post("/api/user/login", (req, res) => {
		console.log("update user")
		console.log(req)
		console.log(res)
	})

	server.post("/api/user/twitterRequestToken", (req, res) => {
		console.log("get token")
		console.log(req)
		console.log(res)
	})

	server.post("/api/user/update", (req, res) => {
		console.log("update user")
		console.log(req)
		console.log(res)
	})

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
