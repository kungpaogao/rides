import Head from "next/head";
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

      <main className="flex flex-col items-center justify-center w-full flex-1">
        {children}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        Built for fun :)
      </footer>
    </div>
  );
}
