import {FormEvent} from "react";
import {Checkbox} from "~/components/forms/checkbox/Checkbox";
import {TodoInterface} from "~/models/todo.model";
import ButtonStandard from "~/components/buttons/button-standard/ButtonStandard";
import {Badge} from "react-bootstrap";

interface TodoInterfaceProps extends TodoInterface {
    onChange: (todo: TodoInterface, e: FormEvent<HTMLInputElement>) => void;
    onClickDelete: (todo: TodoInterface) => void;
    onClickRestore: (todo: TodoInterface) => void;
}

export default function TodoItem(todo: TodoInterfaceProps) {
    const {completed, title, description, onChange, onClickDelete, onClickRestore} = todo;
    return (
        <div className={`py-3 border-bottom d-flex ${description ? 'align-items-start' : 'align-items-center'}`}>
            <div className="px-1">
                <Checkbox checked={completed} onChange={(e) => onChange(todo, e)}/>
            </div>
            <div className="d-flex justify-content-between align-items-center w-100">
                <p className="mb-0 small lh-125">
                    {todo.isDeleted && <Badge bg="danger">Deleted</Badge>}
                    <strong className="d-block text-gray-dark">{title}</strong>
                    {description}
                </p>
                <div>
                    {todo.isDeleted && <ButtonStandard variation="transparent"
                                                       onClick={() => onClickRestore(todo)}
                                                       className="mt-2 text-info">
                        <i className="bi bi-arrow-left-circle"></i> Restore
                    </ButtonStandard>}
                    <ButtonStandard variation="transparent"
                                    onClick={() => onClickDelete(todo)}
                                    className="mt-2 text-danger">
                        {todo?.isDeleted && <><i className="bi bi-x"></i> Destroy </>}
                        {!todo?.isDeleted && <><i className="bi bi-trash"></i> Delete</>}
                    </ButtonStandard>
                </div>
            </div>
        </div>
    );
}