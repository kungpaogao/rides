import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <Head>
        <title>Cornell Rides</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="w-full">
        <Navigation className="px-5 lg:px-28" />
      </nav>

      <main className="mb-12 w-full flex-1 px-5 lg:px-28">{children}</main>

      <Footer />
    </div>
  );
}
