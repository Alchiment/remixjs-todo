import {queryGetUserById, queryGetUsers} from "./src/graphql/resolvers/queries/user.query.js";
import {mutationCreateUser, mutationUpdateUser} from "./src/graphql/resolvers/mutations/user.mutation.js";

export const resolvers = {
    Query: {
        users: queryGetUsers,
        user: queryGetUserById,
    },
    Mutation: {
        createUser: mutationCreateUser,
        updateUser: mutationUpdateUser,
    }
}