import {
    useTodoCreate,
    useTodoDelete,
    useTodoDestroy,
    useTodoRestore,
    useTodos,
    useTodosUpdate
} from "~/lib/graphql/hooks/todos.hooks";
import {FormEvent, useContext, useState} from "react";
import TodoItem from "~/components/todo-item-form/TodoItem";
import {TodoInterface, TodoModel} from "~/models/todo.model";
import ButtonStandard from "~/components/buttons/button-standard/ButtonStandard";
import {ToastNotificationContext, ToastNotificationContextProps} from "~/contexts/ToastNotificationContext";
import FormCreateTodo from "~/form-groups/form-create-todo/FormCreateTodo";
import DeleteConfirmModal from "~/components/modals/DeleteConfirmModal";

export default function TodosPage() {
    const { todos } = useTodos();
    const { createTodo, loading: isCreating, error: errorCreateTodo } = useTodoCreate();
    const { updateTodo, error: errorUpdateTodo } = useTodosUpdate();
    const { deleteTodo, loading: isDeleting } = useTodoDelete();
    const { restoreTodo, loading: isRestoring } = useTodoRestore();
    const { destroyTodo, loading: isDestroying } = useTodoDestroy();

    const { setToastState } = useContext<ToastNotificationContextProps>(ToastNotificationContext);
    const [ formTodo, setFormTodo ] = useState<TodoInterface>(new TodoModel());
    const [ showForm, setShowForm ] = useState<boolean>(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);

    async function completeTodo(todo: TodoInterface, e: FormEvent<HTMLInputElement>) {
        const newStateTodo = new TodoModel({
            ...todo,
            completed: e.currentTarget.checked,
        });
        await updateTodo(newStateTodo.mapToSave());
    }

    async function onSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newTodo = new TodoModel(formTodo);
        await createTodo(newTodo.mapToSave());
        setToastState({
            title: 'TODO Created',
            message: `TODO ${newTodo.title} was created successfully`,
            show: true,
            variation: 'success'
        });
        cancelShowForm();
    }

    function cancelShowForm() {
        setFormTodo(new TodoModel());
        setShowForm(!showForm);
    }

    async function onConfirmDelete() {
        if (isDeleting) { return }
        if (!formTodo.isDeleted) {
            await deleteTodo({ _id: formTodo?._id || ''});
        } else {
            await destroyTodo({ _id: formTodo?._id || ''});
        }
        setShowDeleteModal(false);
    }

    function onCloseDelete() {
        setShowDeleteModal(false);
    }

    function showConfirmDelete (todo: TodoInterface) {
        setFormTodo(new TodoModel(todo));
        setShowDeleteModal(true);
    }

    async function onRestoreTodo(todo: TodoInterface) {
        await restoreTodo({ _id: todo._id });
    }

    return (
        <>
            <header className="d-flex align-items-center justify-content-between">
                <h1>Todos</h1>
                {
                    !showForm
                    &&
                    <ButtonStandard onClick={cancelShowForm}>
                        Agregar TODO
                    </ButtonStandard>
                }
            </header>
            {showForm && <FormCreateTodo formTodo={formTodo}
                                         setFormTodo={setFormTodo}
                                         onSubmit={onSubmitForm}
                                         onCancel={cancelShowForm} />}

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
                                         onClickDelete={showConfirmDelete}
                                         onClickRestore={onRestoreTodo}
                                         description={todo.description}/>
                    })}
                </div>
            </div>
            <DeleteConfirmModal show={showDeleteModal}
                                onConfirm={onConfirmDelete}
                                deleting={isDeleting}
                                title={formTodo.isDeleted ? 'Destroy confirmation' : 'Delete confirmation'}
                                btnDeleteText={formTodo.isDeleted ? 'Destroy' : 'Delete'}
                                html={{__html: !formTodo.isDeleted ? `
                                    <div>
                                        You will move ${formTodo?.title} to the trash.
                                        <br> 
                                        ¿Are you sure to move ${formTodo?.title} to the trash?
                                    <div>`  : `<div>
                                        ${formTodo?.title} is already in the trash.
                                        <br> 
                                        ¿Are you sure to delete ${formTodo?.title} permanently?
                                    <div>`
                                }}
                                onClose={onCloseDelete} />
        </>
    );
}