import { User } from "@supabase/supabase-js";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import BasicButton from "../components/BasicButton";
import { basicFetchPost } from "../lib/basicFetch";
import { queryToString } from "../lib/queryToString";
import { supabase } from "../lib/supabaseClient";

type LoginProps = {
  user: User | null;
};

const features = [
  { id: "post-rides", desc: "Post rides", icon: "📝" },
  { id: "search-rides", desc: "Search rides", icon: "🔍" },
  { id: "send-emails", desc: "Send emails", icon: "📧" },
  { id: "places-autocomplete", desc: "Places autocomplete", icon: "📍" },
];

export default function Login({ user }: LoginProps) {
  const { query, push } = useRouter();
  const redirectQuery = queryToString(query.redirect);

  function redirect() {
    if (query?.redirect?.length) {
      push(redirectQuery);
    } else {
      push("/");
    }
  }

  useEffect(() => {
    if (user) {
      redirect();
    }
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // check if user email is cornell.edu
        if (session?.user?.email?.endsWith("@cornell.edu")) {
          // manually set session, might not be necessary
          supabase.auth.setSession(session?.access_token);
          // set ssr auth
          basicFetchPost("/api/login", { event, session });
          // redirect
          redirect();
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
      {
        redirectTo: `${location.origin}/login?redirect=${encodeURIComponent(
          redirectQuery
        )}`,
      }
    );
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="prose flex w-full max-w-sm flex-col rounded-lg border p-7 shadow-md sm:w-1/2">
        <h2 className="text-lg font-semibold">Sign in or signup</h2>
        <ul className="text-base">
          {features.map((feature) => (
            <li key={feature.id}>
              <span className="mr-2">{feature.icon}</span>
              {feature.desc}
            </li>
          ))}
        </ul>
        <BasicButton
          onClick={signInWithGoogle}
          className="mt-5 flex items-center justify-center gap-2"
        >
          <FcGoogle />
          Sign in with Google
        </BasicButton>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  return { props: { user } };
};
