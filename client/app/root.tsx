import {
    isRouteErrorResponse,
    Links, LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useRouteError,
} from "@remix-run/react";
import {ToastNotificationProvider} from "~/contexts/ToastNotificationContext";
import RootLayout from "~/layouts/_root.layout";
import {ReactNode} from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-100 w-100">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-100 w-100">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <ToastNotificationProvider>
      <RootLayout>
          <Outlet/>
      </RootLayout>
  </ToastNotificationProvider>;
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    let title = 'An error ocurred!';
    let message = error.message;
    // when true, this is what used to go to `CatchBoundary`
    if (isRouteErrorResponse(error)) {
        title = error.statusText;
        message = error.data?.message || 'Something went wrong';
    }

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
            <title>{title}</title>
        </head>
        <body>
        <main className="error">
            <h1>{title}</h1>
            <p>{message}</p>
        </main>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        </body>
        </html>
    );
}
