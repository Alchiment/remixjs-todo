import type {LoaderFunctionArgs, MetaFunction} from "@remix-run/node";
import {UserSessionInterface} from "~/models/user-session.model";
import {useLoaderData} from "@remix-run/react";
import {useEffect} from "react";
import {getUserDetailFromSession} from "~/utils/auth/session";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return await getUserDetailFromSession(request);
}

export default function Index() {
  const userSession: UserSessionInterface = useLoaderData();


  useEffect(() => {
    if (userSession?.token) {
      localStorage.setItem('token', userSession.token);
    }
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
