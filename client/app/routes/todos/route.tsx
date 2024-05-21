import {Container} from "react-bootstrap";
import {Outlet} from "@remix-run/react";

export default function TodosLayout() {
    return (
        <>
            <Container className="layout">
                <main className="layout__content">
                    <Outlet />
                </main>
            </Container>
        </>
    );
}