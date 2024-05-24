import {UserInterface} from "~/models/user.model";
import {FormEvent} from "react";
import {Checkbox} from "~/components/forms/checkbox/Checkbox";
import {TodoInterface} from "~/models/todo.model";

interface TodoInterfaceProps extends TodoInterface {
    onChange: (todo: TodoInterface, e: FormEvent<HTMLInputElement>) => void;
}

export default function TodoItem(todo: TodoInterfaceProps) {
    const {completed, title, description, onChange} = todo;
    return (
        <div className={`py-3 border-bottom d-flex ${description ? 'align-items-start' : 'align-items-center'}`}>
            <div className="px-1">
                <Checkbox checked={completed} onChange={(e) => onChange(todo, e)}/>
            </div>
            <p className="mb-0 small lh-125">
                <strong className="d-block text-gray-dark">{title}</strong>
                {description}
            </p>
        </div>
    );
}