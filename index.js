import express from 'express';
import {
    graphqlHTTP
} from 'express-graphql';
import schema from './src';
import cors from 'cors';
import rateLimit from 'express-request-limit';

var app = express();
const rateLimitOptions = {
    timeout: 1000,
    exactPath: true,
    cleanUpInterval: 0,
    errStatusCode: 429,
    errMessage: 'Too many requests made to this route.'
};

app.use(cors());

app.use('/graphql', rateLimit(rateLimitOptions), graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql.'));