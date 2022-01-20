import type { AppProps } from "next/app";
import "inter-ui/inter.css";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";

function MyApp({ Component, pageProps }: AppProps) {
  supabase.auth.onAuthStateChange((event, session) => {
    // supabase.auth.setSession(session?.access_token)
    console.log(session);
  });

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
