import { useRouter } from "next/router";
import { useState } from "react";
import BasicButton from "../components/BasicButton";
import BasicToast from "../components/BasicToast";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const { push } = useRouter();
  // TODO: remove
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full max-w-5xl py-7 lg:mx-auto">
      <h2 className="mt-8 text-5xl font-bold md:mt-16">
        Carpool with <br />
        other students
      </h2>
      <h3 className="mt-5 text-2xl">
        An open-source platform to post and search for rides.
      </h3>

      <div className="mt-12">
        <SearchBar />
      </div>
      <div className="my-7 flex w-full items-center gap-5">
        <span className="flex-1 border-b-2" />
        <p>or</p>
        <span className="flex-1 border-b-2" />
      </div>
      <BasicButton
        className="w-full rounded-lg py-5"
        onClick={() => push("/ride/new")}
      >
        Post a ride
      </BasicButton>
      <BasicToast
        open={open}
        setOpen={setOpen}
        title="Notifications"
        description="We added notifications!"
        closeLabel="Cool!"
      />
    </div>
  );
}
