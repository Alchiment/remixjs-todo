import {queryGetUserById, queryGetUsers} from "./src/graphql/resolvers/queries/user.query.js";
import {mutationCreateUser, mutationUpdateUser} from "./src/graphql/resolvers/mutations/user.mutation.js";
import {queryGetTodoById, queryGetTodos} from "./src/graphql/resolvers/queries/todo.query.js";
import {
    mutationCreateTodo,
    mutationDeleteTodo, mutationDestroyTodo,
    mutationUpdateTodo
} from "./src/graphql/resolvers/mutations/todo.mutation.js";

export const resolvers = {
    Query: {
        users: queryGetUsers,
        user: queryGetUserById,
        todos: queryGetTodos,
        todo: queryGetTodoById,
    },
    Mutation: {
        createUser: mutationCreateUser,
        updateUser: mutationUpdateUser,
        createTodo: mutationCreateTodo,
        updateTodo: mutationUpdateTodo,
        deleteTodo: mutationDeleteTodo,
        destroyTodo: mutationDestroyTodo,
    }
}