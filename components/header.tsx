import { hyphenateText } from "utils/textFunctions"
import { logout } from "@actions/user"
import { Provider, connect } from "react-redux"
import {
	Button,
	Container,
	Divider,
	Dropdown,
	Grid,
	Icon,
	Image,
	Label,
	Menu,
	Responsive,
	Sidebar
} from "semantic-ui-react"
// import Logo from "@public/images/logos/brain-logo.png"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import store from "@store"
import Url from "url-parse"

function Header(props) {
	return (
		<Provider store={store}>

		</Provider>
	)
}

Header.defaultProps = {
	authenticated: false,
	logout
}

Header.propTypes = {
	authenticated: PropTypes.bool,
	logout: PropTypes.func
}

const mapStateToProps = (state, ownProps) => ({
	...state.user,
	...ownProps
})

export default connect(mapStateToProps, { logout })(Header)