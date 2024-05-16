import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {expressMiddleware as apolloMiddleware} from "@apollo/server/express4";
import {ApolloServer} from "@apollo/server";
import {readFile} from "node:fs/promises";
import {resolvers} from "./resolvers.js";
import dbConn from './utils/db/database.js';
import {fetchUserById} from "./src/repositories/user.repository.js";

import {verifyJwt} from "./src/middlewares/auth.middleware.js";
import {authRoutes} from "./src/routes/auth.routes.js";

const PORT = 7000;
const app = express();

app.use(cors(), express.json(), verifyJwt);
app.use('/api/auth', authRoutes);

app.get('/api', (req, res) => {
    res.json('Welcome to RemixJS Laboratory API')
});

async function getContext({ req }) {
    if (req.auth) {
        const user = await fetchUserById({id: req.auth.sub});
        return { user };
    }
    return {};
}

const typeDefs = await readFile('./schema.graphql', 'utf8');

const apolloServer = new ApolloServer({typeDefs, resolvers});
await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer, { context: getContext }))

await dbConn.openConnection();

app.listen({port: PORT}, () => {
    console.log(`Server running on ${PORT}`);
    console.log(`Graphql server running on ${PORT}/graphql`);
});
