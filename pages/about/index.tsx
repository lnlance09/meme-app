import { Grid, Header, Image, List, Placeholder } from "semantic-ui-react"
import { useRouter } from "next/router"
import DefaultLayout from "@layouts/default"
import PropTypes from "prop-types"
import React, { Fragment, useState } from "react"

const About: React.FunctionComponent = (props) => {
	const [loading, setLoading] = useState(true)

	const router = useRouter()
	const { tab } = router.query
	console.log(tab)

	return (
		<DefaultLayout
			containerClassName="aboutPage"
			seo={{
				description: "",
				image: {
					height: 200,
					src: "",
					width: 200
				},
				title: "",
				url: ""
			}}
		>
			<Fragment>
				<Grid>
					<Grid.Row>
						<Grid.Column width={11}>
							{loading ? (
								<Placeholder>
									<Placeholder.Image square />
								</Placeholder>
							) : (
								<Image />
							)}
						</Grid.Column>
						<Grid.Column width={5}>
							<List size="big">
								<List.Item>23 memes</List.Item>
								<List.Item>23 templates</List.Item>
							</List>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Fragment>
		</DefaultLayout>
	)
}

About.propTypes = {}

About.defaultProps = {}

export default About
