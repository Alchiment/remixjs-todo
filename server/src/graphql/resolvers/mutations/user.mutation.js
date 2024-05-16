import {unauthorizedError} from "../../common-methods.resolver.js";
import {createUser, updateUser} from "../../../repositories/user.repository.js";

export function mutationCreateUser(_root, {input}, {user}) {
    if (!user) {
        throw unauthorizedError('Missing authentication');
    }
    return createUser(input);
}

export function mutationUpdateUser(_root, {input}, {user}) {
    if (!user) {
        throw unauthorizedError('Missing authentication');
    }
    return updateUser(input);
}