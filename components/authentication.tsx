import {
	submitLoginForm,
	submitRegistrationForm,
	twitterRequestToken,
	verifyEmail
} from "@actions/authentication"
import {
	Button,
	Divider,
	Form,
	Header,
	Icon,
	Input,
	Label,
	Message,
	Segment
} from "semantic-ui-react"
import { Provider, connect } from "react-redux"
import PropTypes from "prop-types"
import React, { useCallback, useEffect, useState } from "react"
import store from "@store"

const Authentication: React.FunctionComponent = (props) => {
	const [email, setEmail] = useState("")
	const [loadingLogin, setLoadingLogin] = useState(false)
	const [loadingRegistration, setLoadingRegistration] = useState(false)
	const [login, setLogin] = useState(true)
	const [loginError, setLoginError] = useState(false)
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [regEmail, setRegEmail] = useState("")
	const [regPassword, setRegPassword] = useState("")
	const [user, setUser] = useState({})
	const [username, setUsername] = useState("")
	const [verificationCode, setVerificationCode] = useState("")
	const [verify, setVerify] = useState(false)

	useEffect(() => {
		props.twitterRequestToken({
			reset: true
		})
	}, [])

	const toggleLogin = useCallback(() => {
		setLoadingLogin(false)
		setLoadingRegistration(false)
		setLogin(!login)
	}, [login])

	const redirectToUrl = useCallback((url) => {
		if (url) {
			window.open(url, "_self")
		}
	}, [])

	const submitEmailVerificationForm = useCallback((e) => {
		e.preventDefault()
		if (verificationCode.length > 3) {
			props.verifyEmail({
				bearer: props.bearer,
				code: verificationCode
			})
		}
	}, [])

	const submitLoginForm = useCallback(
		(e) => {
			console.log("submitLoginForm")
			console.log(email)
			console.log(password)
			if (email.length > 0 && password.length > 0) {
				setLoadingLogin(true)
				props.submitLoginForm({
					email,
					password
				})
			}
		},
		[email, password]
	)

	const submitRegistrationForm = useCallback(() => {
		setLoadingRegistration(true)
		props.submitRegistrationForm({
			email: regEmail,
			name,
			password: regPassword,
			username
		})
	}, [])

	const EmailVerificationForm = () => {
		if (props.verify) {
			return (
				<div>
					<Form onSubmit={submitEmailVerificationForm}>
						<Form.Field>
							<Input
								onChange={setVerificationCode}
								placeholder="Verification code"
								value={verificationCode}
							/>
						</Form.Field>
						<Button color="green" content="Verify" fluid type="submit" />
					</Form>
				</div>
			)
		}

		return null
	}

	const ErrorMsg = () => {
		if (props.loginError && props.loginErrorMsg) {
			return <Message content={props.loginErrorMsg} error />
		}
	}

	const HeaderText = () => {
		if (!props.verify) {
			return login ? "Sign in" : "Create an account"
		}
		return "Please verify your email"
	}

	const InfoBox = () => {
		if (!props.verify) {
			return (
				<Label attached="bottom" className="registerText">
					{RegisterText()}{" "}
					<span className="registerLink" onClick={() => toggleLogin()}>
						{RegisterButton()}
					</span>
				</Label>
			)
		}

		return null
	}

	const MainForm = () => {
		if (login && !props.verify) {
			return (
				<Form loading={loadingLogin && !props.loginError}>
					<Form.Field>
						<Input
							onChange={(e, { value }) => {
								setEmail(value)
							}}
							placeholder="Email or username"
							value={email}
						/>
					</Form.Field>
					<Form.Field>
						<Input
							onChange={(e, { value }) => {
								setPassword(value)
							}}
							placeholder="Password"
							type="password"
							value={password}
						/>
					</Form.Field>
					<Form.Field>
						<Button
							color="blue"
							content="Sign in"
							fluid
							onClick={submitLoginForm}
							type="submit"
						/>
					</Form.Field>
				</Form>
			)
		}

		if (!login && !props.verify) {
			return (
				<Form loading={loadingRegistration && !props.loginError}>
					<Form.Field>
						<Input
							onChange={(e, { value }) => {
								setRegEmail(value)
							}}
							placeholder="Email"
							value={regEmail}
						/>
					</Form.Field>
					<Form.Field>
						<Input
							onChange={(e, { value }) => {
								setRegPassword(value)
							}}
							value={regPassword}
							placeholder="Password"
							type="password"
						/>
					</Form.Field>
					<Form.Field>
						<Input
							autoComplete="off"
							onChange={(e, { value }) => {
								setName(value)
							}}
							placeholder="Full name"
							value={name}
						/>
					</Form.Field>
					<Form.Field>
						<Input
							onChange={(e, { value }) => {
								setUsername(value)
							}}
							placeholder="Username"
							value={username}
						/>
					</Form.Field>
					<Form.Field>
						<Button
							color="blue"
							content="Create an account"
							fluid
							onClick={submitRegistrationForm}
							type="submit"
						/>
					</Form.Field>
				</Form>
			)
		}
	}

	const RegisterButton = () => (login ? "Create an account" : "Sign in")

	const RegisterText = () => (login ? "New to Blather?" : "Already have an account?")

	const TwitterLogin = (
		<Button
			className="twitterBtn"
			color="twitter"
			fluid
			onClick={redirectToUrl(props.data.twitterUrl)}
		>
			<Icon name="twitter" /> {login ? "Sign in" : "Sign up"} with Twitter
		</Button>
	)

	return (
		<Provider store={store}>
			<div className="authComponent">
				<Header as="h1">{HeaderText()}</Header>
				<Segment>
					{MainForm()}
					{ErrorMsg()}
					{EmailVerificationForm()}
					<Divider />
					{InfoBox()}
				</Segment>
				<Divider horizontal>Or</Divider>
				<Segment>{TwitterLogin}</Segment>
			</div>
		</Provider>
	)
}

Authentication.propTypes = {
	authenticated: PropTypes.bool,
	bearer: PropTypes.string,
	data: PropTypes.shape({
		dateCreated: PropTypes.string,
		email: PropTypes.string,
		emailVerified: PropTypes.bool,
		name: PropTypes.string,
		id: PropTypes.string,
		img: PropTypes.string,
		linkedTwitter: PropTypes.bool,
		twitterAccessToken: PropTypes.string,
		twitterAccessSecret: PropTypes.string,
		twitterDate: PropTypes.string,
		twitterId: PropTypes.string,
		twitterUrl: PropTypes.string,
		twitterUsername: PropTypes.string,
		username: PropTypes.string
	}),
	loadingLogin: PropTypes.bool,
	loadingRegistration: PropTypes.bool,
	login: PropTypes.bool,
	loginError: PropTypes.bool,
	loginErrorMsg: PropTypes.string,
	submitLoginForm: PropTypes.func.isRequired,
	submitRegistrationForm: PropTypes.func.isRequired,
	twitterRequestToken: PropTypes.func,
	verificationCode: PropTypes.string,
	verify: PropTypes.bool,
	verifyEmail: PropTypes.func
}

Authentication.defaultProps = {
	data: {},
	login: true
}

const mapStateToProps = (state: any, ownProps: any) => ({
	...state.authentication,
	...ownProps
})

export default connect(mapStateToProps, {
	submitLoginForm,
	submitRegistrationForm,
	twitterRequestToken,
	verifyEmail
})(Authentication)
