import {Outlet} from "@remix-run/react";
import {getUserDetailFromSession, requireUserSession} from "~/utils/auth/session";
import {LoaderFunctionArgs} from "@remix-run/node";

export default function TodosLayout() {
    return ( <Outlet /> );
}

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserSession(request);
    return await getUserDetailFromSession(request);
}