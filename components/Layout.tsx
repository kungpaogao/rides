import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Cornell Rides</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="text-left w-full p-5 border-b">
        <span className="text-2xl font-bold">
          <Link href="/">Cornell Rides</Link>
        </span>
      </nav>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-5 py-7">
        {children}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        Built for fun :)
      </footer>
    </div>
  );
}
