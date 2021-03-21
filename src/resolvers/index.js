// Mutations:
import signup from './mutations/signup';

// Queries:
import signin from './queries/signin';
import tokenControl from './queries/tokenControl';
import home from './queries/home';

const resolvers = {
    Mutation: {
        signup
    },
    Query: {
        signin,
        tokenControl,
        home
    }
};
export default resolvers;