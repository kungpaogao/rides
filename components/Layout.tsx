import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

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

      <nav className="w-full">
        <Navigation className="px-5 lg:px-28" />
      </nav>

      <main className="w-full flex-1 px-5 lg:px-28">{children}</main>

      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}
