import { Auth } from "@supabase/ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { basicFetchPostRes } from "../lib/basicFetch";
import { useNavigation } from "../lib/hooks/useNavigation";
import { supabase } from "../lib/supabaseClient";
import BasicButton from "./BasicButton";

export default function Navigation({ className = "" }: { className?: string }) {
  const { push } = useRouter();
  const { user } = Auth.useUser();
  const { redirect } = useNavigation();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
    // TODO: show toast
    await basicFetchPostRes("/api/logout", {});
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
        <BasicButton onClick={() => push(`/login?redirect=${redirect}`)}>
          Log in
        </BasicButton>
      )}
    </div>
  );
}
