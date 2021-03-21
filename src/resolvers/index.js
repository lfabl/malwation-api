// Mutations:
import signup from './mutations/signup';

// Queries:
import signin from './queries/signin';

const resolvers = {
    Mutation: {
        signup
    },
    Query: {
        signin
    }
};
export default resolvers;