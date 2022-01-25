import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Cornell Rides</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="w-full border-b p-5 text-left">
        <span className="text-2xl font-bold">
          <Link href="/">Cornell Rides</Link>
        </span>
      </nav>

      <main className="flex w-full flex-1 flex-col items-center px-5 py-7">
        {children}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        Built for fun :)
      </footer>
    </div>
  );
}
