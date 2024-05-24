import {FormEvent} from "react";
import {Form} from "react-bootstrap";
interface FormCheckboxListItem {
    label: string;
    value: string|number;
    checked: boolean;
}

interface FormCheckboxListProps {
    name: string;
    items: FormCheckboxListItem[],
    onChange(e: FormEvent<HTMLInputElement>, index: number): void
    onClick?(e: FormEvent<HTMLInputElement>, index: number): void
}

export default function RadioButtonList({name = '', items = [], onChange, onClick}: FormCheckboxListProps) {
    return <>
        {(!items || items && !items?.length) && <div>Sin registros</div>}
        {items && items.map(
            ({ label, value, checked }: FormCheckboxListItem, index: number) => <Form.Check type="radio"
                                                                                            label={label}
                                                                                            name={name}
                                                                                            value={value}
                                                                                            key={index}
                                                                                            checked={checked}
                                                                                            onClick={(e) => {
                                                                                                if (onClick) { return onClick(e, index) }
                                                                                            }}
                                                                                            onChange={(e) => onChange(e, index)}/>
        )}
    </>;
}