import {Reference, useMutation, useQuery} from "@apollo/client/index.js";
import {todosQuery} from "~/lib/graphql/queries/todos.query";
import {TodoInterface, TodoModel} from "~/models/todo.model";
import {
    todoCreateMutation,
    todoDeleteMutation,
    todoDestroyMutation, todoRestoreMutation,
    todoUpdateMutation
} from "~/lib/graphql/mutations/todos.mutation";

export function useTodos() {
    const { data, loading, error } = useQuery(todosQuery, {
        fetchPolicy: 'network-only',
    });
    const todos: TodoInterface[] = data?.todos?.map(
        (todo: TodoInterface) => new TodoModel(todo)
    ) || [];
    return { todos, loading, error };
}

export function useTodosUpdate() {
    const [mutate, { loading, error }] = useMutation(todoUpdateMutation);
    const updateTodoMutate = async (input: Partial<TodoInterface>) => {
        const { data: { updateTodo } } = await mutate({
            variables: { input },
            update: (cache, { data }) => {
                const existingTodos: any = cache.readQuery({ query: todosQuery });
                const newTodos = existingTodos.todos.map((todo: any) =>
                    todo._id === data.updateTodo._id ? {...todo, ...data.updateTodo} : todo
                );
                cache.writeQuery({
                    query: todosQuery,
                    variables: { _id: data.updateTodo._id },
                    data: { todos: newTodos },
                });
            }
        });
        return updateTodo;
    }
    return {
        updateTodo: updateTodoMutate,
        loading,
        error,
    }
}

export function useTodoCreate() {
    const [mutate, { loading, error }] = useMutation(todoCreateMutation);
    const createTodoMutate = async (input: Partial<TodoInterface>) => {
        const { data: { createTodo } } = await mutate({
            variables: { input },
            refetchQueries: [{ query: todosQuery }],
        });
        return createTodo;
    }
    return {
        createTodo: createTodoMutate,
        loading,
        error,
    }
}

export function useTodoRestore() {
    const [mutate, { loading, error }] = useMutation(todoRestoreMutation);

    const restoreTodoMutate = async ({_id}: Partial<TodoInterface>) => {
        const { data: { restoreTodo } } = await mutate({
            variables: { restoreTodoId: _id },
            update: (cache, { data }) => {
                const existingTodos: any = cache.readQuery({ query: todosQuery });
                const newTodos = existingTodos.todos.map((todo: any) =>
                    todo._id === data.restoreTodo ? {...todo, isDeleted: false} : todo
                );
                cache.writeQuery({
                    query: todosQuery,
                    variables: { _id: data.restoreTodo },
                    data: { todos: newTodos },
                });
            }
        });
        return restoreTodo;
    }
    return {
        restoreTodo: restoreTodoMutate,
        loading,
        error,
    }
}

export function useTodoDelete() {
    const [mutate, { loading, error }] = useMutation(todoDeleteMutation);

    const deleteTodoMutate = async ({_id}: Partial<TodoInterface>) => {
        const { data: { deleteTodo } } = await mutate({
            variables: { deleteTodoId: _id },
            update: (cache, { data }) => {
                const existingTodos: any = cache.readQuery({ query: todosQuery });
                const newTodos = existingTodos.todos.map((todo: any) =>
                    todo._id === data.deleteTodo ? {...todo, isDeleted: true} : todo
                );
                cache.writeQuery({
                    query: todosQuery,
                    variables: { _id: data.deleteTodo },
                    data: { todos: newTodos },
                });
            }
        });
        return deleteTodo;
    }
    return {
        deleteTodo: deleteTodoMutate,
        loading,
        error,
    }
}

export function useTodoDestroy() {
    const [mutate, { loading, error }] = useMutation(todoDestroyMutation);

    const destroyTodoMutate = async ({_id}: Partial<TodoInterface>) => {
        const { data: { destroyTodo } } = await mutate({
            variables: { destroyTodoId: _id },
            update: (cache) => {
                cache.modify({
                    fields: {
                        todos(existingTodos, { readField }) {
                            return existingTodos.filter(
                                (todoRef: Reference) => _id !== readField('_id', todoRef)
                            );
                        },
                    },
                });
            }
        });
        return destroyTodo;
    }
    return {
        destroyTodo: destroyTodoMutate,
        loading,
        error,
    }
}