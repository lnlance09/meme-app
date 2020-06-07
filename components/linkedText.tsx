import * as linkify from "linkifyjs"
import { baseUrl } from "@options/config"
import hashtag from "linkifyjs/plugins/hashtag"
import Linkify from "linkifyjs/react"
import React, { useEffect } from "react"

const LinkedText: React.FunctionComponent = ({ text }) => {
	useEffect(() => {
		hashtag(linkify)
	}, [])

	return (
		<Linkify
			options={{
				formatHref: {
					hashtag: (val) => `${baseUrl}explore/memes?q=${val.substr(1)}`
				}
			}}
		>
			{text}
		</Linkify>
	)
}

export default LinkedText
