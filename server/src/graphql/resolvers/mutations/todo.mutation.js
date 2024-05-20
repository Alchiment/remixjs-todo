import {notFoundError, unauthorizedError} from "../../common-methods.resolver.js";
import {createTodo, destroyTodo, softDeleteTodo, updateTodoById} from "../../../repositories/todo.repository.js";

export function mutationCreateTodo(_root, {input}, {user}) {
    if (!user) {
        throw unauthorizedError('Missing authentication');
    }
    return createTodo(input);
}

export function mutationUpdateTodo(_root, {input}, {user}) {
    if (!user) {
        throw unauthorizedError('Missing authentication');
    }
    return updateTodoById(input);
}

export async function mutationDeleteTodo(_root, { id }, { user }) {
    if (!user) {
        throw unauthorizedError('Missing authentication');
    }
    const todoDeleted = await softDeleteTodo(id);
    if (!todoDeleted) {
        throw notFoundError('No TODO found with id ' + id);
    }
    return todoDeleted;
}

export async function mutationDestroyTodo(_root, { id }, { user }) {
    if (!user) {
        throw unauthorizedError('Missing authentication');
    }
    const todoDeleted = await destroyTodo(id);
    if (!todoDeleted) {
        throw notFoundError('No TODO found with id ' + id);
    }
    return todoDeleted;
}

