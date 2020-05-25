import { ApolloServer, gql } from "apollo-server-micro"
import Knex from "knex"

const db = new Knex({
	client: "mysql",
	connection: ""
})

const typeDefs = gql`
	type Query {
		hello: String!
	}
`

const resolvers = {
	Query: {
		hello: (_parent, _args, _context) => {
			return "Hello"
		}
	}
}

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers
})

const handler = apolloServer.createHandler({
	path: "/api/graphql"
})

export const config = {
	api: {
		bodyParser: false
	}
}

export default handler
