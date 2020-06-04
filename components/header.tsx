import { logout } from "@actions/authentication"
import { parseJwt } from "@utils/tokenFunctions"
import { useRouter } from "next/router"
import { Provider, connect } from "react-redux"
import { Button, Container, Dropdown, Icon, Image, Menu, Sidebar } from "semantic-ui-react"
import DefaultPic from "@public/images/avatar/small/chris.jpg"
import Link from "next/link"
import Logo from "@public/images/logos/jackie-chan.svg"
import PropTypes from "prop-types"
import React, { Fragment, useEffect, useState } from "react"
import Router from "next/router"
import store from "@store"

const Header: React.FunctionComponent = ({ basic, loading, logout }) => {
	const router = useRouter()

	const [authenticated, setAuthenticated] = useState(null)
	const [user, setUser] = useState({})
	const [visible, toggleVisibility] = useState(false)

	useEffect(() => {
		const userData = parseJwt()
		if (userData) {
			setUser(userData)
			setAuthenticated(true)
		} else {
			setAuthenticated(false)
		}
	}, [])

	const { img, name, username } = user

	const LoginButton = () => {
		if (authenticated === true) {
			const trigger = (
				<Image
					avatar
					bordered
					circular
					onError={(i) => (i.target.src = DefaultPic)}
					rounded
					src={img ? img : DefaultPic}
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
								onClick={() => router.push(`/artists/${username}`)}
								text="Profile"
							/>
							<Dropdown.Item
								onClick={() => {
									localStorage.removeItem("jwtToken")
									logout()
									Router.reload(window.location.pathname)
								}}
								text="Log out"
							/>
						</Dropdown.Menu>
					</Dropdown>
				</Menu.Item>
			)
		}

		if (authenticated === false) {
			return (
				<Menu.Item className="headerMenuItem signInLink" direction="right" position="right">
					<Button
						color="violet"
						content="Sign In"
						onClick={() => router.push("/signin?type=join")}
					/>
					<Icon name="sidebar" onClick={() => toggleVisibility(!visible)} size="big" />
				</Menu.Item>
			)
		}

		return null
	}

	return (
		<Provider store={store}>
			<div className="pageHeader">
				<div className="rainbow" />
				{loading && (
					<Fragment>
						<div class="subline inc" />
						<div class="subline dec" />
					</Fragment>
				)}

				{basic ? (
					<Container className="headerContainer" textAlign="center">
						<Image
							className="headerLogo"
							inline
							onClick={() => router.push("/")}
							src={Logo}
							style={{ cursor: "pointer" }}
						/>
					</Container>
				) : (
					<Fragment>
						<Menu borderless className="globalHeader" fitted="vertically" fixed="top">
							<Container className="headerContainer">
								<Menu.Item className="headerMenuItem">
									<Image className="headerLogo" src={Logo} />
									<Link href="/">
										<a className="logoText">Brandy</a>
									</Link>
								</Menu.Item>
								<Menu.Item className="headerMenuItem create">
									<Link href="/create">
										<a>Create</a>
									</Link>
								</Menu.Item>
								<Menu.Item className="headerMenuItem explore">
									<Link href="/explore/memes">
										<a>Explore</a>
									</Link>
								</Menu.Item>
								{LoginButton()}
							</Container>
						</Menu>

						<Sidebar
							as={Menu}
							animation="overlay"
							borderless
							icon="labeled"
							vertical
							visible={visible}
							width="wide"
						>
							{authenticated && <Menu.Item onClick={logout}>Sign Out</Menu.Item>}
							<Menu.Item>
								<Link href="/create">
									<a>Create</a>
								</Link>
							</Menu.Item>
							<Menu.Item>
								<Link href="/create">
									<a>Explore</a>
								</Link>
							</Menu.Item>
						</Sidebar>
					</Fragment>
				)}
			</div>
		</Provider>
	)
}

Header.propTypes = {
	basic: PropTypes.bool,
	loading: PropTypes.bool,
	logout: PropTypes.func
}

Header.defaultProps = {
	basic: false,
	loading: false,
	logout
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.authentication,
	...ownProps
})

export default connect(mapStateToProps, { logout })(Header)
