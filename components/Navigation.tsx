import Link from "next/link";
import { useRouter } from "next/router";
import BasicButton from "./BasicButton";

export default function Navigation({ className = "" }: { className?: string }) {
  const { push } = useRouter();

  return (
    <div
      className={`flex w-full items-center border-b py-5 text-left ${className}`}
    >
      <span className="flex-1 text-2xl font-bold">
        <Link href="/">Cornell Rides</Link>
      </span>
      <BasicButton onClick={() => push("/login")}>Login</BasicButton>
    </div>
  );
}
