import { Form } from "react-bootstrap";
import {ChangeEvent} from "react";

interface FormInputPropsInterface {
    id: string;
    label?: string;
    placeholder?: string;
    type?: string;
    value?: string|number;
    disabled?: boolean;
    defaultValue?: string|number;
    onChange?(e: ChangeEvent<unknown>): void;
}

export default function FormInput({ id, label, placeholder, type = 'text', value, onChange, defaultValue, disabled }: FormInputPropsInterface) {
    return <>
        <Form.Group className="w-100" controlId={id}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control name={id}
                          type={type}
                          placeholder={placeholder}
                          value={value}
                          disabled={disabled}
                          defaultValue={defaultValue}
                          onChange={
                (e) => {
                    if (onChange) {
                        onChange(e)
                    }
            }} />
        </Form.Group>
    </>;
}