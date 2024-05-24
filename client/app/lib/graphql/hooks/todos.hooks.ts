import {useMutation, useQuery} from "@apollo/client/index.js";
import {todosQuery} from "~/lib/graphql/queries/todos.query";
import {TodoInterface, TodoModel} from "~/models/todo.model";
import {todoUpdateMutation} from "~/lib/graphql/mutations/todos.mutation";

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
    const updateTodoMutate = async (input: TodoInterface) => {
        const { data: { updateTodo } } = await mutate({
            variables: { input },
            update: (cache, { data }) => {
                const existingTodos: any = cache.readQuery({ query: todosQuery });
                const newTodos = existingTodos.todos.map((todo: any) =>
                    todo._id === data.updateTodo._id ? data.updateTodo : todo
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
