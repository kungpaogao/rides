import BasicButton from "../components/BasicButton";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  async function signInWithGoogle() {
    await supabase.auth.signIn({
      provider: "google",
    });
  }

  return (
    <div>
      <BasicButton onClick={signInWithGoogle}>Sign in with Google</BasicButton>
    </div>
  );
}
