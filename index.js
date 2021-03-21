import express from 'express';
import {
    graphqlHTTP
} from 'express-graphql';
import schema from './src';
import cors from 'cors';
import rateLimit from 'express-request-limit';
import {
    setJWTKey,
    JWT_KEY
} from './src/constants';
import {
    r
} from './src/database';
import jwt from 'jsonwebtoken';

var app = express();
const rateLimitOptions = {
    timeout: 300,
    exactPath: true,
    cleanUpInterval: 0,
    errStatusCode: 429,
    errMessage: 'Too many requests made to this route.'
};

app.use(cors());

app.use('/graphql', rateLimit(rateLimitOptions), async (req, res, next) => {
    if(req.headers && req.headers.authorization) {
        const tokenDecode = jwt.verify(req.headers.authorization, JWT_KEY);
        const userData = await r
            .db("malwation")
            .table("users")
            .filter({
                userName: tokenDecode.userName
            })
            .run();
        if(!(userData && userData.length)) {
            next();
        }
        const user = userData[0];
        req.data = {
            userID: user.id,
            userName: user.userName
        };
        next();
    } else {
        next();
    }
}, graphqlHTTP((request, response, graphQLParams) => ({
    schema: schema,
    context: request.data,
    graphiql: true
})));

const createJWTKey = async () => {
    const newKey = await r.uuid();
    setJWTKey(newKey);
};
createJWTKey();

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql.'));