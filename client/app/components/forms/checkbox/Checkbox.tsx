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
                       label={<div>
                           {icon && <i className={`${icon} mx-1`}></i>}
                           {img && <img src={img} className={ `${imgClass} mx-1` } alt={label}/>}
                           {label}
                       </div>}
                       name={name}
                       checked={checked}
                       disabled={disabled}
                       onChange={(e) => onChange(e)}/>;
}