import {Form} from "react-bootstrap";
import {FormEvent} from "react";

interface CheckboxProps {
    name?: string;
    label?: string;
    checked: boolean;
    disabled?: boolean;
    icon?: string;
    img?: string;
    imgClass?: string;
    onChange(e: FormEvent<HTMLInputElement>): void;
}

export function Checkbox({ name = '', label = '', checked = false, onChange, disabled = false, icon, img, imgClass }: CheckboxProps) {
    return <Form.Check type="checkbox"
                       label={label}
                       name={name}
                       checked={checked}
                       disabled={disabled}
                       onChange={(e) => onChange(e)}/>;
}