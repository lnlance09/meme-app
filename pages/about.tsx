import { Grid, Header, Image, Placeholder } from "semantic-ui-react"
import { Provider, connect } from "react-redux"
import DefaultLayout from "@layouts/default"
import PropTypes from "prop-types"
import React, { Fragment } from "react"
import store from "@store"

const About: React.FunctionComponent = (props) => {
	const [loading, setLoading] = useState(true)

	return (
		<Provider store={store}>
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
		</Provider>
	)
}

About.propTypes = {}

About.defaultProps = {}

export default About
