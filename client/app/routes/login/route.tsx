import {useActionData} from "@remix-run/react";
import {useEffect, useState} from "react";
import {Alert, Card, Form} from "react-bootstrap";
import ButtonStandard from "~/components/buttons/button-standard/ButtonStandard";
import {ActionFunctionArgs, json, LinksFunction, LoaderFunctionArgs, redirect} from "@remix-run/node";
import {createUserSession, getUserDetailFromSession} from "~/utils/auth/session";
import {UserSessionInterface} from "~/models/user-session.model";
import {system} from "~/constants/system.constants";
import axios, {AxiosError} from "axios";
import {ApiAuthResponseInterface} from "~/models/api-auth-response.model";
import FormInput from "~/components/forms/form-input/FormInput";
import BigTitle from "~/components/titles/big-title/BigTitle";

import loginCSS from "./login.css?url";

interface ResponseActionInterface {
    message: string|null;
    status: 'success'|'fail';
    email?: string;
    fullname?: string;
    token?: string;
}

export const links: LinksFunction = () => {
    const loginStyles = {rel: 'stylesheet', href: loginCSS};
    return [loginStyles];
};

export default function LoginPage() {
    const data: ResponseActionInterface|undefined = useActionData();
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        setIsloading(false);
    }, []);

    function onSubmitLogin(e: any) {
        setIsloading(true);
    }

    return <div className="layout_login-content">
        <Card>
            <Card.Body>
                {data?.message && <Alert variant={data?.status === 'fail' ? 'danger': 'success'}>{data.message}</Alert>}

                <Form method="post" onSubmit={(e: any) => onSubmitLogin(e)}>
                    <BigTitle title="TODOs Laboratory" />
                    <FormInput id="email" label="Correo electrónico" placeholder="yo@yo.com" />
                    <FormInput id="password" type="password" label="Contraseña" placeholder="********" />
                    <ButtonStandard block={true}
                                    type="submit"
                                    className="mt-2"
                                    disabled={isLoading && !data?.message}
                                    showSpinner={isLoading && !data?.message}>
                        Iniciar
                    </ButtonStandard>
                </Form>
            </Card.Body>
        </Card>
    </div>;
    // </ Container>;
}

export async function loader({ request }: LoaderFunctionArgs) {

    const userSession: UserSessionInterface|null = await getUserDetailFromSession(request);
    console.log('userSession', userSession)
    if (userSession?.userId) {
        // Redirect to the home page if they are already signed in.
        return redirect("/");
    }
    return userSession?.userId || null;
}

export async function action({request}: ActionFunctionArgs) {
    try {
        const formData = await request.formData();
        const {email, password} = Object.fromEntries(formData);
        if (!email || !password) {
            return { status: 'fail', message: 'Email and password must required' };
        }
        console.log('response', `${system.API_PATH}/api/auth/login`)
        const response: any = await axios.post(`${system.API_PATH}/api/auth/login`, {email, password});
        const data: ApiAuthResponseInterface = response.data;
        return await createUserSession(data, '/');
    } catch (e: any|AxiosError) {
        if (e instanceof AxiosError) {
            const response = e.response?.data || {message: e.code};
            return json({
                message: response.message || response.error || 'Unknown error',
                status: 'fail'
            });
        }
        throw json({
            message: e.message,
            status: 'fail'
        });
    }
}