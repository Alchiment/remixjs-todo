import { Spinner } from "react-bootstrap";

interface SpinnerElementPropsInterface {
    size?: 'sm'|null;
}

export function SpinnerElement({ size = 'sm' }: SpinnerElementPropsInterface) {
    return <Spinner as="span" animation="border" size={size ? size : undefined} role="status"/>;
}