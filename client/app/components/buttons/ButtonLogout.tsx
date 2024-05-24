import { useLoaderData } from "@remix-run/react";
import { Form } from "react-bootstrap";
import {UserSessionInterface} from "~/models/user-session.model";

export default function ButtonLogout() {
    const userSession: UserSessionInterface = useLoaderData();
    return <>
        {userSession?.userId && <Form method="post" action="/logout">
          <button className="btn btn-link">Logout</button>
        </Form>}
    </>;
} 