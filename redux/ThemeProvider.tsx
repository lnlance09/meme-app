import React from "react"

const themes = {
	dark: {
		background: "#333"
	},
	light: {
		background: "#f5f5f9"
	}
}

const { Provider, Consumer } = React.createContext(themes)

export const ThemeProvider = ({ children }) => {
	return <Provider value={themes}>{children}</Provider>
}

export const withTheme = (theme) => {
	return (Component) => (props) => (
		<Consumer>
			{(themes) => {
				return (
					<Component
						{...props}
						inverted={theme === "dark"}
						style={{ ...themes[theme] }}
						theme={theme}
					/>
				)
			}}
		</Consumer>
	)
}
