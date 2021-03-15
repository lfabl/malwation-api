import mutationTest from './mutations/test';
import queryTest from './queries/test';

const resolvers = {
    Mutation: {
        test: mutationTest
    },
    Query: {
        test: queryTest
    }
};
export default resolvers;