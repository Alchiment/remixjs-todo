import {Link} from "@remix-run/react";
import {Container} from "react-bootstrap";

export default function NavbarMenu() {
    return <>
        <nav className="navbar d-flex justify-content-between navbar-dark bg-dark">
            <Container>
                <Link to="/" className="navbar-brand">
                    RemixJS Laboratory
                </Link>

                <div className="px-2">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/todos" className="nav-link">TODOs</Link>
                        </li>
                    </ul>
                </div>
            </Container>
        </nav>
    </>;
}