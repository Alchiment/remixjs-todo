import FormInput from "~/components/forms/form-input/FormInput";
import FormTextarea from "~/components/forms/form-textarea/FormTextarea";
import {Checkbox} from "~/components/forms/checkbox/Checkbox";
import ButtonStandard from "~/components/buttons/button-standard/ButtonStandard";
import {Form} from "react-bootstrap";
import {Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState} from "react";
import {TodoInterface, TodoModel} from "~/models/todo.model";
import {ToastNotificationContext, ToastNotificationContextProps} from "~/contexts/ToastNotificationContext";
import {useTodoCreate} from "~/lib/graphql/hooks/todos.hooks";

interface FormCreateTodoProps {
    formTodo: TodoInterface;
    setFormTodo: Dispatch<SetStateAction<TodoInterface>>
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
}

export default function FormCreateTodo({ formTodo, setFormTodo, onSubmit, onCancel }: FormCreateTodoProps) {
    const { setToastState } = useContext<ToastNotificationContextProps>(ToastNotificationContext);

    const { createTodo, loading: isCreating, error: errorCreateTodo } = useTodoCreate();

    useEffect(() => {
        let message = <div></div>;
        if (errorCreateTodo) {
            message = <div>{errorCreateTodo?.message}</div>;
        }
        if (errorCreateTodo) {
            setToastState({
                title: 'Ups! hay un problema',
                message,
                show: true,
                variation: 'danger',
            });
        }
    }, [errorCreateTodo]);

    return (
        <Form onSubmit={onSubmit}>
            <div className="mb-1">
                <FormInput id="form_todo_title"
                           label="Title"
                           type="text"
                           value={formTodo?.title || ''}
                           onChange={(e) => setFormTodo({
                               ...formTodo,
                               title: (e.target as HTMLInputElement).value,
                           })}></FormInput>
            </div>
            <div className="mb-1">
                <FormTextarea id="form_todo_description"
                              label="Descripción"
                              value={formTodo?.description || ''}
                              onChange={(e) => setFormTodo({
                                  ...formTodo,
                                  description: (e.target as HTMLInputElement).value
                              })}></FormTextarea>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <div className="mb-1">
                    <Checkbox name="form_todo_completed"
                              label="Complete"
                              checked={formTodo?.completed}
                              onChange={
                                  (e) => setFormTodo({
                                      ...formTodo,
                                      completed: e.currentTarget.checked
                                  })}/>
                </div>
                <div className="mb-1">
                    <ButtonStandard type="submit"
                                    className="mt-2"
                                    disabled={isCreating}
                                    showSpinner={isCreating}>
                        Save
                    </ButtonStandard>
                    <ButtonStandard variation="transparent"
                                    className="mt-2"
                                    onClick={onCancel}
                                    disabled={isCreating}
                                    showSpinner={isCreating}>
                        Cancel
                    </ButtonStandard>
                </div>
            </div>
        </Form>
    );
}