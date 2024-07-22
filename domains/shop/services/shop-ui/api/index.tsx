/** @jsx createElement */
import { classNames, createElement, renderToString } from "../helper/jsx.ts";
import { Context } from "../model.ts";

const title = "shop-ui";
const siteRefreshMillis = 250;

// deno-lint-ignore require-await
export const handleIndex = async (ctx: Context, req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const pageParam = url.searchParams.get("page");

  const html = renderToString(
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          // CSP policy for htmx server content to mitigate cross-site scripting.
          http-equiv="content-security-policy"
          content="default-src 'self' 'unsafe-inline' 'unsafe-eval' unpkg.com tailwindui.com;"
        />
        <meta
          name="htmx-config"
          content='{"selfRequestsOnly":true,"allowEval":true,"allowScriptTags":false,"ignoreTitle":false,"historyCacheSize":0}'
        />
        <script
          src="https://unpkg.com/@twind/cdn@1.0.8/cdn.global.js"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://unpkg.com/htmx.org@2.0.0/dist/htmx.min.js"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://unpkg.com/idiomorph@0.3.0/dist/idiomorph-ext.min.js"
          crossorigin="anonymous"
        ></script>
      </head>
      <body
        class={classNames(
          "grid m-0 min-h-[100vh]",
          // CSS styles for body element to fill visible area in safari browser on ipad.
          "supports-[-webkit-touch-callout:none]:min-h-[-webkit-fill-available]"
        )}
      >
        <div class="hidden">
          <div
            // Trigger browser refresh after development webserver changes using endpoint polling.
            hx-get={`/site-refresh?timestamp=${ctx.serverTimestamp}`}
            hx-trigger={`every ${siteRefreshMillis}ms`}
            hx-swap="none swap:0s settle:0s"
          ></div>
        </div>
        <main
          class="relative grid w-full h-full"
          hx-ext="morph"
          hx-get={`/site?page=${pageParam}`}
          hx-trigger="load"
          hx-swap="innerHTML"
        ></main>
      </body>
    </html>
  );

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};
