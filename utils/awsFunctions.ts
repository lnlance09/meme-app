const AWS = require("aws-sdk")
const fs = require("fs")

const s3 = new AWS.S3({
	accessKeyId: "AKIA3KB7ZZF26C4NLY6O",
	secretAccessKey: "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"
})

module.exports = {
	uploadToS3: async function (file, fileName) {
		const fileContent = fs.readFileSync(file)
		const params = {
			Bucket: "brandywine22",
			Key: fileName,
			Body: fileContent
		}

		// Uploading files to the bucket
		s3.upload(params, function (err, data) {
			if (err) {
				throw err
			}
			console.log(`File uploaded successfully. ${data.Location}`)
		})
	}
}
