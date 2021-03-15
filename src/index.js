import {
    makeExecutableSchema 
} from 'graphql-tools';
import typeDefs from './typedefs';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
    resolvers,
    typeDefs
});
export default schema;