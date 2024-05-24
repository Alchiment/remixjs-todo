import {Form} from "react-bootstrap";
import {ChangeEvent} from "react";

interface FormTextareaPropsInterface {
    id: string;
    label?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    onChange?(e: ChangeEvent<unknown>): void;
}

export default function FormTextarea({ id, label, placeholder, value, onChange, defaultValue, disabled }: FormTextareaPropsInterface) {
    return <>
        <Form.Group className="w-100" controlId={id}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control as="textarea"
                          name={id}
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