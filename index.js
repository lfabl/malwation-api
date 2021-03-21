import express from 'express';
import {
    graphqlHTTP
} from 'express-graphql';
import schema from './src';
import cors from 'cors';
import rateLimit from 'express-request-limit';
import {
    setJWTKey 
} from './src/constants';
import {
    r
} from './src/database';

var app = express();
const rateLimitOptions = {
    timeout: 300,
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

const createJWTKey = async () => {
    const newKey = await r.uuid();
    setJWTKey(newKey);
};
createJWTKey();

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql.'));