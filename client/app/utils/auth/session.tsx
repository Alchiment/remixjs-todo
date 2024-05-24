// app/sessions.ts
import { ActionFunctionArgs, createCookieSessionStorage, redirect } from "@remix-run/node"; // or cloudflare/deno
import { COOKIE_SESSION_KEYS } from "~/constants/auth.constants";
import {UserSessionInterface} from "~/models/user-session.model";
import {ApiAuthResponseInterface} from "~/models/api-auth-response.model";

const SESSION_SECRET = process.env.COOKIE_AUTH_SECRET || '';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    // secure: process.env.NODE_ENV === 'production',
    secure: false,
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  }
});

export async function createUserSession(apiMareResponse: ApiAuthResponseInterface, redirectPath: string) {
  const session = await sessionStorage.getSession();
  session.set(COOKIE_SESSION_KEYS.USER_ID, apiMareResponse.id);
  session.set(COOKIE_SESSION_KEYS.TOKEN, apiMareResponse.token);
  session.set(COOKIE_SESSION_KEYS.FULLNAME, apiMareResponse.fullname);
  session.set(COOKIE_SESSION_KEYS.EMAIL, apiMareResponse.email);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session)
    }
  });
}

export async function getUserDetailFromSession(request: Request): Promise<UserSessionInterface|null> {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  const userId = session.get(COOKIE_SESSION_KEYS.USER_ID);
  const token = session.get(COOKIE_SESSION_KEYS.TOKEN);
  const fullname = session.get(COOKIE_SESSION_KEYS.FULLNAME);
  const email = session.get(COOKIE_SESSION_KEYS.EMAIL);
  if (!userId) {
    return null;
  }
  return {userId, token, fullname, email};
}

export async function getUserFromSession(request: any) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  // return request.headers.get('Cookie');
  const userId = session.get('userId');

  if (!userId) {
    return null;
  }

  return userId;
}

export async function getTokenFromSession(request: any) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  // return request.headers.get('Cookie');
  const userId = session.get('token');

  if (!userId) {
    return null;
  }

  return userId;
}

export async function destroyUserSession(request: Request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session)
    }
  });
}

export async function requireUserSession(request: Request) {
  const userSession: UserSessionInterface|null = await getUserDetailFromSession(request);
  if (!userSession?.userId) {
    throw redirect('/login?mode=login');
  }
}