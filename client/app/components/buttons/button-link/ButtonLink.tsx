import { Link } from "@remix-run/react";
import {ReactNode} from "react";

interface ButtonLinkProps {
    children: ReactNode;
    path: string;
    type?: 'button'|'link'|'transparent',
    icon?: string;
    className?: string;
}

export function ButtonLink({ children, path, type = 'link', icon, className }: ButtonLinkProps) {
    let classType = '';
    if (type === 'button') {
        classType = 'btn btn-sm btn-dark';
    } else if (type === 'transparent') {
        classType = 'btn btn-transparent';
    }

    return <Link to={path} className={`${classType} ${className}`}>
        {icon && <i className={`bi ${icon}`}></i>} {children}
    </Link>
}