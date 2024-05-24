import { Button } from "react-bootstrap";
import { SpinnerElement } from "~/components/spinners/SpinnerElement";
import {ReactNode} from "react";

interface ButtonStandardPropsInterface {
    children: ReactNode;
    block?: boolean;
    type?: 'button'|'submit';
    onClick?(): void;
    disabled?: boolean;
    showSpinner?: boolean;
    size?: 'lg'|'sm';
    variation?: 'primary'|'danger'|'success'|'info'|'warning'|'dark';
    className?: string;
    icon?: string;
}

export default function ButtonStandard(
    {
        children,
        block,
        type = 'button',
        onClick,
        disabled,
        showSpinner = false,
        size='sm',
        variation = 'dark',
        className = '',
        icon
    }: ButtonStandardPropsInterface
) {
    return <>
        <Button type={type}
                onClick={onClick}
                disabled={disabled}
                size={size}
                variant={variation}
                className={`${className} ${block ? 'w-100' : ''}` }>
            { showSpinner && <SpinnerElement /> }
            { icon && <i className={icon}></i> }
            <span className="mx-1">
                {children}
            </span>
        </Button>
    </>;
}