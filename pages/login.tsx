import { User } from "@supabase/supabase-js";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BasicButton from "../components/BasicButton";
import { basicFetchPost } from "../lib/basicFetch";
import { queryToString } from "../lib/queryToString";
import { supabase } from "../lib/supabaseClient";

type LoginProps = {
  user: User | null;
};

export default function Login({ user }: LoginProps) {
  const { query, push } = useRouter();
  const redirect = queryToString(query.redirect);

  useEffect(() => {
    if (user) {
      if (query?.redirect?.length) {
        push(redirect);
      } else {
        push("/");
      }
    }
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // check if user email is cornell.edu
        if (session?.user?.email?.endsWith("@cornell.edu")) {
          // manually set session, might not be necessary
          supabase.auth.setSession(session?.access_token);
          basicFetchPost("/api/auth", { event, session });
        } else {
          // TODO: some dialog or toast message
          console.error("This app is for Cornell University members only.");
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    await supabase.auth.signIn(
      {
        provider: "google",
      },
      { redirectTo: `${location.origin}/login` }
    );
  }

  return (
    <div>
      <BasicButton onClick={signInWithGoogle}>Sign in with Google</BasicButton>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  return { props: { user } };
};
