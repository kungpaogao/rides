import { useRouter } from "next/router";
import { useEffect } from "react";
import BasicButton from "../components/BasicButton";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const { query, push } = useRouter();
  const redirect = Array.isArray(query.redirect)
    ? query.redirect.join("")
    : query.redirect;

  // redirect if user is already signed in
  useEffect(() => {
    if (supabase.auth.session()) {
      push(redirect || "/");
    }
  }, []);

  async function signInWithGoogle() {
    await supabase.auth.signIn(
      {
        provider: "google",
      },
      { redirectTo: `${location.origin}${redirect}` }
    );
  }

  return (
    <div>
      <BasicButton onClick={signInWithGoogle}>Sign in with Google</BasicButton>
    </div>
  );
}
