import axios from "axios"
import Router from "next/router"
import { Cookies } from "react-cookie"

const cookies = new Cookies()
const serverUrl = "http://localhost:3000"

export async function handleAuthSSR(ctx) {
	let token = null

	if (ctx.req) {
		token = ctx.req.headers.cookie.replace(
			/(?:(?:^|.*;\s*)bearer\s*\=\s*([^;]*).*$)|^.*$/,
			"$1"
		)
	} else {
		token = cookies.get("bearer")
	}

	try {
		const response = await axios.get(`${serverUrl}/api/token/ping`, {
			headers: { Authorization: token }
		})
		console.log("token ping:", response.data.msg)
	} catch (err) {
		console.log(err.response.data.msg)
		console.log("redirecting back to main page")
		if (ctx.res) {
			ctx.res.writeHead(302, {
				Location: "/"
			})
			ctx.res.end()
		} else {
			Router.push("/")
		}
	}
}

export const getCookies = async () => {
	const cookies = new Cookies()
	return await cookies.get("bearer")
}

export const removeCookies = async () => {
	const cookies = new Cookies()
	await cookies.remove("bearer")
}

export const setCookies = async (bearer) => {
	const cookies = new Cookies()
	let d = new Date()
	d.setTime(d.getTime() + 5000 * 60 * 1000)
	await cookies.set("bearer", bearer, { path: "/", expires: d })
}
