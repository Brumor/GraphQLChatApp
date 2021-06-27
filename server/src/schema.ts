const schema = `
      type Chat {
        id: Int!
        from: String!
        message: String!
      }

      type User {
        id: Int!
        userName: String!
      }

      type Query {
        chats: [Chat]
      }

      type Mutation {
        sendMessage(from: String!, message: String!): Chat
        createUser(userName: String!): User
      }

      type Subscription {
        messageSent: Chat
      }
		`;

export default schema;
