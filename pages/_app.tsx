import type { AppProps } from "next/app";
import "inter-ui/inter.css";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { supabase } from "../lib/supabaseClient";

function MyApp({ Component, pageProps }: AppProps) {
  supabase.auth.onAuthStateChange(async (_event, session) => {
    if (session) {
      // check if user email is cornell.edu
      if (session.user?.email?.endsWith("@cornell.edu")) {
        // manually set session, might not be necessary
        supabase.auth.setSession(session?.access_token);
      } else {
        // TODO: some dialog or toast message
        console.error("This app is for Cornell University members only.");
      }
    }
  });

  return <Layout>{<Component {...pageProps} />}</Layout>;
}

export default MyApp;
