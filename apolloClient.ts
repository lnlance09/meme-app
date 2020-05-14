import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

const createApolloClient = (initialState: any, ctx: boolean) => {
	return new ApolloClient({
		ssrMode: Boolean(ctx),
		link: new HttpLink({
			uri: 'https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn',
			credentials: 'same-origin',
			fetch
		}),
		cache: new InMemoryCache().restore(initialState)
	})
}

export default createApolloClient
