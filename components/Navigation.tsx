import { Auth } from "@supabase/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import BasicButton from "./BasicButton";

export default function Navigation({ className = "" }: { className?: string }) {
  const { push } = useRouter();
  const { user } = Auth.useUser();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
  }

  return (
    <div
      className={`flex w-full items-center border-b py-5 text-left ${className}`}
    >
      <span className="flex-1 text-2xl font-bold">
        <Link href="/">Cornell Rides</Link>
      </span>
      {user ? (
        <BasicButton onClick={signOut}>Log out</BasicButton>
      ) : (
        <BasicButton onClick={() => push("/login")}>Log in</BasicButton>
      )}
    </div>
  );
}
