import 'semantic-ui-css/semantic.min.css'
import '@style/style.scss'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'
import store from '@store'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App