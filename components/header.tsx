import { logout } from "@actions/user"
import { Provider, connect } from "react-redux"
import {
	Button,
	Container,
	Dropdown,
	Icon,
	Image,
	Menu,
	Responsive,
	Sidebar
} from "semantic-ui-react"
import Link from "next/link"
import Logo from "@public/images/logos/jackie-chan.svg"
import PropTypes from "prop-types"
import React, { Fragment, useState } from "react"
import store from "@store"

const Header: React.FunctionComponent = (props) => {
	const [visible, toggleVisibility] = useState(false)

	const LoginButton = () => {
		if (props.authenticated) {
			const trigger = (
				<Image
					avatar
					bordered
					circular
					onError={(i) => (i.target.src = ImagePic)}
					rounded
					src={props.data.img ? props.data.img : ImagePic}
				/>
			)

			return (
				<Menu.Item position="right">
					<Dropdown
						className="dropDownMenu"
						icon={false}
						pointing="top right"
						trigger={trigger}
					>
						<Dropdown.Menu>
							<Dropdown.Item
								onClick={() => props.history.push(`/users/${props.data.username}`)}
								text={props.data.name}
							/>
							<Dropdown.Divider />
							<Dropdown.Item
								onClick={() =>
									props.history.push(`/users/${props.data.username}/fallacies`)
								}
								text="My Fallacies"
							/>
							<Dropdown.Item
								onClick={() =>
									props.history.push(`/users/${props.data.username}/archives`)
								}
								text="My Archives"
							/>
							<Dropdown.Divider />
							<Dropdown.Item
								onClick={() => props.history.push(`/settings`)}
								text="Settings"
							/>
							<Dropdown.Item onClick={this.onLogout} text="Log out" />
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
			)
		}

		return (
			<Menu.Item className="signInLink" direction="right" position="right">
				<Link href="/signin?type=join">
					<Button color="violet" content="Sign In" />
				</Link>
			</Menu.Item>
		)
	}

	return (
		<Provider store={store}>
			<div className="pageHeader">
				<div className="rainbow" />
				{props.basic ? (
					<Container className="headerContainer" textAlign="center">
						<Link href="/">
							<a>
								<Image className="headerLogo" inline src={Logo} />
							</a>
						</Link>
					</Container>
				) : (
					<Fragment>
						<Menu borderless className="globalHeader" fitted="vertically" fixed="top">
							<Container className="headerContainer">
								{/*
								<Responsive className="responsive" maxWidth={1024}>
									<Menu.Item className="headerMenuItem"></Menu.Item>
									<Menu.Item className="sidebarItem" position="right">
										{!props.authenticated && (
											<Button
												color="red"
												compact
												content="Sign In"
												onClick={() => props.history.push("/signin")}
											/>
										)}
										<Icon
											name="sidebar"
											onClick={() => toggleVisibility(!visible)}
											size="large"
										/>
									</Menu.Item>
								</Responsive>
								*/}
								<Responsive className="responsive" minWidth={1025}>
									<Menu.Item className="headerMenuItem">
										<Image className="headerLogo" src={Logo} />
										<Link href="/">
											<a className="logoText">Brandy</a>
										</Link>
									</Menu.Item>
									<Menu.Item className="headerMenuItem">
										<Link href="/create">
											<a>Create</a>
										</Link>
									</Menu.Item>
									<Menu.Item className="headerMenuItem">
										<Link href="/explore">
											<a>Explore</a>
										</Link>
									</Menu.Item>
									{LoginButton()}
								</Responsive>
							</Container>
						</Menu>

						<Sidebar
							as={Menu}
							animation="overlay"
							icon="labeled"
							vertical
							visible={visible}
							width="wide"
						>
							<Menu.Item>
								<Button
									color="blue"
									content="Assign a fallacy"
									fluid
									icon="pencil"
									onClick={() => props.history.push("/assign")}
								/>
							</Menu.Item>
							{props.authenticated && (
								<Menu.Item onClick={this.onLogout}>Sign Out</Menu.Item>
							)}
						</Sidebar>
					</Fragment>
				)}
			</div>
		</Provider>
	)
}

Header.propTypes = {
	authenticated: PropTypes.bool,
	basic: PropTypes.bool,
	logout: PropTypes.func
}

Header.defaultProps = {
	authenticated: false,
	basic: false,
	logout
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.authentication,
	...ownProps
})

export default connect(mapStateToProps, { logout })(Header)
