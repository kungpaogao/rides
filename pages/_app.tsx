import type { AppProps } from "next/app";
import { Auth } from "@supabase/ui";
import { supabase } from "../lib/supabaseClient";
import Layout from "../components/Layout";
import "inter-ui/inter.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Layout>{<Component {...pageProps} />}</Layout>
    </Auth.UserContextProvider>
  );
}

export default MyApp;
