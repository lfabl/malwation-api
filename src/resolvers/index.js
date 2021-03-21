// Mutations:
import signup from './mutations/signup';

// Queries:
import signin from './queries/signin';
import tokenControl from './queries/tokenControl';

const resolvers = {
    Mutation: {
        signup
    },
    Query: {
        signin,
        tokenControl
    }
};
export default resolvers;