import type { AppProps } from "next/app";
import { Auth } from "@supabase/ui";
import { supabase } from "../lib/supabaseClient";
import Layout from "../components/Layout";
import "inter-ui/inter.css";
import "../styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
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
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Layout>{<Component {...pageProps} />}</Layout>
    </Auth.UserContextProvider>
  );
}

export default MyApp;
