import signup from './mutations/signup';
import queryTest from './queries/test';

const resolvers = {
    Mutation: {
        signup
    },
    Query: {
        test: queryTest
    }
};
export default resolvers;