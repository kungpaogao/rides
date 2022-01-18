import BasicButton from "../components/BasicButton";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  async function signInWithGoogle() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "google",
    });
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <div>
      <BasicButton onClick={signInWithGoogle}>Sign in with Google</BasicButton>
    </div>
  );
}
