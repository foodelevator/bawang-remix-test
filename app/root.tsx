import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css?url";
import { taitanSchema } from "./taitan";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-neutral-50">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  return <>
    <header className="bg-cerise text-offwhite fixed left-0 right-0 text-center">{data.nav.map(node =>
      <a
        className="p-2"
        key={node.slug}
        href={node.slug}
      >{node.title}</a>
    )}</header>
    <Outlet />
  </>;
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title + " - Konglig Datasektionen" },
  ];
};

export async function loader() {
  const res = await fetch("https://taitan.datasektionen.se/");
  return taitanSchema.parse(await res.json());
}
