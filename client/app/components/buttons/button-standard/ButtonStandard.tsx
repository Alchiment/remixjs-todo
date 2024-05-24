import { Button } from "react-bootstrap";
import { SpinnerElement } from "~/components/spinners/SpinnerElement";
import {ReactNode} from "react";

interface ButtonStandardPropsInterface {
    children?: ReactNode;
    block?: boolean;
    type?: 'button'|'submit';
    onClick?(): void;
    disabled?: boolean;
    showSpinner?: boolean;
    size?: 'lg'|'sm';
    variation?: 'primary'|'danger'|'success'|'info'|'warning'|'dark'|'transparent';
    className?: string;
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
            <span className="mx-1">
                {children}
            </span>
        </Button>
    </>;
}