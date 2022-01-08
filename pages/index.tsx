import Link from "next/link";

export default function Home() {
  return (
    <div className="prose prose-a:no-underline">
      <h1>Cornell Rides</h1>
      <span className="border rounded shadow px-2 py-1 inline-block">
        <Link href={"/new-ride"}>Post a ride</Link>
      </span>
      <p>or</p>
      <h2>Search a ride</h2>
      <label className="block">
        From
        <input className="ml-3 border rounded px-2 py-1" placeholder="Ithaca" />
      </label>
      <label className="block mt-3">
        To
        <input className="ml-3 border rounded px-2 py-1" placeholder="Boston" />
      </label>
      <label className="block mt-3">
        Date
        <input type="date" className="ml-3 border rounded px-2 py-1" />
      </label>
      <span className="border rounded shadow px-2 py-1 mt-3 inline-block">
        <Link href={"/results"}>Search</Link>
      </span>
    </div>
  );
}
