/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { PassThrough } from "node:stream";

import type { AppLoadContext, EntryContext } from "@remix-run/node";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream, renderToString } from "react-dom/server";
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from "@apollo/client/index.js";
import {getDataFromTree} from "@apollo/client/react/ssr/index.js";

const ABORT_DELAY = 5_000;

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext,
    // This is ignored so we can keep it in the template for visibility.  Feel
    // free to delete this parameter in your app if you're not using it!
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadContext: AppLoadContext
) {
  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: "http://localhost:7000/graphql/", // from Apollo's Voyage tutorial series (https://www.apollographql.com/tutorials/voyage-part1/)
      // @ts-ignore --- TODO: fix
      headers: request.headers,
      credentials: request.credentials ?? "include", // or "same-origin" if your backend server is the same domain
    }),
  });

  const App = (
      <ApolloProvider client={client}>
        <RemixServer context={remixContext} url={request.url} />
      </ApolloProvider>
  );


  return getDataFromTree(App).then(() => {
    // Extract the entirety of the Apollo Client cache's current state
    const initialState = client.extract();
    const markup = renderToString(
        <>
          {App}
          <script
              dangerouslySetInnerHTML={{
                __html: `window.__APOLLO_STATE__=${JSON.stringify(
                    initialState
                ).replace(/</g, "\\u003c")}`, // The replace call escapes the < character to prevent cross-site scripting attacks that are possible via the presence of </script> in a string literal
              }}
          />
        </>
    );

    responseHeaders.set("Content-Type", "text/html");

    return new Response("<!DOCTYPE html>" + markup, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  });
}


function handleBotRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
        <RemixServer
            context={remixContext}
            url={request.url}
            abortDelay={ABORT_DELAY}
        />,
        {
          onAllReady() {
            shellRendered = true;
            const body = new PassThrough();
            const stream = createReadableStreamFromReadable(body);

            responseHeaders.set("Content-Type", "text/html");

            resolve(
                new Response(stream, {
                  headers: responseHeaders,
                  status: responseStatusCode,
                })
            );

            pipe(body);
          },
          onShellError(error: unknown) {
            reject(error);
          },
          onError(error: unknown) {
            responseStatusCode = 500;
            // Log streaming rendering errors from inside the shell.  Don't log
            // errors encountered during initial shell rendering since they'll
            // reject and get logged in handleDocumentRequest.
            if (shellRendered) {
              console.error(error);
            }
          },
        }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

function handleBrowserRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
        <RemixServer
            context={remixContext}
            url={request.url}
            abortDelay={ABORT_DELAY}
        />,
        {
          onShellReady() {
            shellRendered = true;
            const body = new PassThrough();
            const stream = createReadableStreamFromReadable(body);

            responseHeaders.set("Content-Type", "text/html");

            resolve(
                new Response(stream, {
                  headers: responseHeaders,
                  status: responseStatusCode,
                })
            );

            pipe(body);
          },
          onShellError(error: unknown) {
            reject(error);
          },
          onError(error: unknown) {
            responseStatusCode = 500;
            // Log streaming rendering errors from inside the shell.  Don't log
            // errors encountered during initial shell rendering since they'll
            // reject and get logged in handleDocumentRequest.
            if (shellRendered) {
              console.error(error);
            }
          },
        }
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
