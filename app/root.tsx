import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react';
import './tailwind.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-screen divide-y divide-abc-grey-30 font-sans">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <header className="px-4 py-5">
        <img src="/logo.svg" alt="ABC Health System Logo" />
      </header>
      <main className="flex flex-col flex-1 overflow-auto bg-abc-soft">
        <Outlet />
      </main>
    </>
  );
}
