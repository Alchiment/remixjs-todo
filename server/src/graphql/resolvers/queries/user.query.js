import {notFoundError, unauthorizedError} from "../../common-methods.resolver.js";
import {fetchUserById, fetchUsers} from "../../../repositories/user.repository.js";

export async function queryGetUserById(_root, {id}, { user }) {
    if (!user) {
        throw unauthorizedError('Missing authentication');
    }
    const userDb = await fetchUserById({id});
    if (!userDb) {
        throw notFoundError(`No User found with id: ${id}`);
    }
    return userDb;
}

export async function queryGetUsers(_root, {}, {user}) {
    if (!user) {
        throw unauthorizedError('Missing authentication');
    }
    return await fetchUsers();
}