import { Container, List, Segment } from "semantic-ui-react"
import Link from "next/link"
import React from "react"

function Footer() {
	return (
		<Segment attached="bottom" className="footerSegment">
			<Container>
				<List className="footerList" horizontal inverted link>
					<List.Item>
						<Link href="/about"><a>About</a></Link>
					</List.Item>
					<List.Item>
						<Link href="/about/contact"><a>Contact</a></Link>
					</List.Item>
					<List.Item>
						<Link href="/about/privacy"><a>Privacy</a></Link>
					</List.Item>
					<List.Item>
						<Link href="/about/rules"><a>Rules</a></Link>
					</List.Item>
				</List>
				<p>© 2018 - 2020, Blather</p>
			</Container>
		</Segment>
	)
}

export default Footer