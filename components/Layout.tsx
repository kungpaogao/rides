import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./Footer";
import Navigation, { NavigationProps } from "./Navigation";

type LayoutProps = {
  children: ReactNode;
  navigationProps?: NavigationProps;
};

export default function Layout({ children, navigationProps }: LayoutProps) {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <Head>
        <title>Cornell Rides</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="w-full">
        <Navigation {...navigationProps} />
      </nav>

      <main className="mb-12 w-full flex-1 px-5 lg:px-28">{children}</main>

      <Footer />
    </div>
  );
}
