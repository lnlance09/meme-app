const express = require("express")
const { check, validationResult } = require("express-validator")
const next = require("next")
const bodyParser = require("body-parser")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
	const server = express()
	server.use(bodyParser.json())

	// const jsonParser = bodyParser.json()
	// const urlencodedParser = bodyParser.urlencoded({ extended: false })

	server.post("/api/meme/create", (req, res) => {
		console.log("create meme")
		console.log(req.body)

		const { images } = req.body
		if (images.length === 0) {
			return res.status(422).json({ error: true, msg: "You must include at least one image" })
		}

		// console.log(res)
	})

	server.post("/twitter/requestToken", (req, res) => {
		console.log("get token")
		console.log(req)
		console.log(res)
		// return app.render(req, res, "/b", req.query)
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
