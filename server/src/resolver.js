const chats = [];
const CHAT_CHANNEL = "CHAT_CHANNEL";

const resolvers = {
  Query: {
    chats(root, args, context) {
      return chats;
    },
  },

  Mutation: {
    sendMessage(root, { from, message }, { pubsub }) {
      const chat = { id: chats.length + 1, from, message };
      console.log({ chat });

      chats.push(chat);
      pubsub.publish("CHAT_CHANNEL", { messageSent: chat });

      return chat;
    },
  },

  Subscription: {
    messageSent: {
      subscribe: (root, args, { pubsub }) => {
        return pubsub.asyncIterator(CHAT_CHANNEL);
      },
    },
  },
};

module.exports = resolvers;
