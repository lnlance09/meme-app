const nodemailer = require("nodemailer")

module.exports = {
	sendEmail: async function (to, subject, text, html) {
		let testAccount = await nodemailer.createTestAccount()
		let transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: testAccount.user,
				pass: testAccount.pass
			}
		})

		let info = await transporter.sendMail({
			from: '"Fred Foo 👻" <foo@example.com>',
			to,
			subject,
			text,
			html
		})

		console.log("info", info)
	}
}
