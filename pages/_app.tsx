import "semantic-ui-css/semantic.min.css"
import "@style/style.scss"
import { AppProps } from "next/app"
import { Provider } from "react-redux"
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloClient } from "apollo-client"
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from "apollo-link-http"
import store from "@store"

let globalApolloClient = null

const initApolloClient = (initialState) => {
	if (typeof window === "undefined") {
		return createApolloClient(initialState)
	}

	if (!globalApolloClient) {
		globalApolloClient = createApolloClient(initialState)
	}

	return globalApolloClient
}

const createApolloClient = (initialState = {}) => {
	return new ApolloClient({
		ssrMode: typeof window === "undefined",
		link: new HttpLink({
			uri: "http://localhost:4000/graphql",
			credentials: "same-origin"
		}),
		cache: new InMemoryCache().restore(initialState)
	})
}

const App = ({ Component, pageProps }: AppProps) => {
	// const apolloState = apolloClient.cache.extract()
	const client = initApolloClient()

	return (
		<Provider store={store}>
			<ApolloProvider client={client}>
				<Component {...pageProps} />
			</ApolloProvider>
		</Provider>
	)
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
/*
App.getInitialProps = async (appContext) => {
	// calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = await App.getInitialProps(appContext)

	return { ...appProps }
}
*/

export default App
