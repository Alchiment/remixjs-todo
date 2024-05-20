import {notFoundError, unauthorizedError} from "../../common-methods.resolver.js";
import {fetchTodoById, fetchTodos} from "../../../repositories/todo.repository.js";

export async function queryGetTodos(_root, {}, {user}) {
    if (!user) {
        throw unauthorizedError('Missing authentication');
    }
    return await fetchTodos();
}

export async function queryGetTodoById(_root, {id}, {user}) {
    if (!user) {
        throw unauthorizedError('Missing authentication');
    }
    const todoDB = await fetchTodoById({id});
    if (!todoDB) {
        throw notFoundError(`No TODO found with id: ${id}`);
    }
    return todoDB;
}

