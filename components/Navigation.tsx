import Link from "next/link";
import BasicButton from "./BasicButton";

export default function Navigation({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex w-full items-center border-b py-5 text-left ${className}`}
    >
      <span className="flex-1 text-2xl font-bold">
        <Link href="/">Cornell Rides</Link>
      </span>
      <BasicButton>Login</BasicButton>
    </div>
  );
}
