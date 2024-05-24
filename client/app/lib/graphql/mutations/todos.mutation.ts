import {gql} from "@apollo/client/index.js";

export const todoUpdateMutation = gql`
    mutation UpdateTodo($input: TodoInput!) {
        updateTodo(input: $input) {
            _id
            title
            description
            completed
            isDeleted
        }
    }  
`;

export const todoCreateMutation = gql`
    mutation CreateTodo($input: TodoInput!) {
        createTodo(input: $input) {
            _id
            title
            description
            completed
        }
    }
`;

export const todoDeleteMutation = gql`
    mutation DeleteTodo($deleteTodoId: String!) {
        deleteTodo(id: $deleteTodoId)
    }
`;

export const todoDestroyMutation = gql`
    mutation DestroyTodo($destroyTodoId: String!) {
        destroyTodo(id: $destroyTodoId)
    }
`;

export const todoRestoreMutation = gql`
    mutation RestoreTodo($restoreTodoId: String!) {
        restoreTodo(id: $restoreTodoId)
    }
`;