import type { AppProps } from "next/app";
import { Auth } from "@supabase/ui";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import { supabase } from "../lib/supabaseClient";
import Layout from "../components/Layout";
import "inter-ui/inter.css";
import "../styles/globals.css";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

dayjs.extend(isBetween);
dayjs.extend(utc);

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      {getLayout(<Component {...pageProps} />)}
    </Auth.UserContextProvider>
  );
}

export default MyApp;
