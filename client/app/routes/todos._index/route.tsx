import {useTodos, useTodosUpdate} from "~/lib/graphql/hooks/todos.hooks";
import {FormEvent} from "react";
import TodoItem from "~/components/todo-item-form/TodoItem";
import {TodoInterface} from "~/models/todo.model";

export default function TodosPage() {
    const { todos } = useTodos();
    const { updateTodo } = useTodosUpdate();

    async function completeTodo(todo: TodoInterface, e: FormEvent<HTMLInputElement>) {
        const newStateTodo = {
            ...todo,
            completed: e.currentTarget.checked,
        }
        await updateTodo(newStateTodo);
    }

    return (
        <>
            <h1>Todos</h1>
            <div className="my-3 p-3 bg-white rounded box-shadow">
                <div className="media text-muted">
                    {todos?.map((todo, index) => {
                        return <TodoItem _id={todo._id}
                                         title={todo.title}
                                         completed={todo.completed}
                                         key={index}
                                         isDeleted={todo.isDeleted}
                                         user={todo.user}
                                         onChange={completeTodo}
                                         description={todo.description} />
                    })}
                </div>
            </div>
        </>
    );
}