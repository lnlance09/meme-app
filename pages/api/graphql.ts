import { ApolloServer, gql } from "apollo-server-micro"
import Knex from "knex"

const db = new Knex({
	client: "mysql2",
	connection: "http://localhost:3306/brandy"
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
