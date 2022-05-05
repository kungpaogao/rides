import { Ride } from "@prisma/client";
import { useRouter } from "next/router";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiDollarSign,
  FiUser,
} from "react-icons/fi";
import BasicButton from "../../components/BasicButton";
import BasicInput from "../../components/BasicInput";
import BasicTextArea from "../../components/BasicTextArea";
import { useFetchStatus } from "../../lib/useFetchStatus";
import PageStatus from "../../types/PageStatus";
import { Auth } from "@supabase/ui";
import { useState } from "react";
import { basicFetchPostWithAuth } from "../../lib/basicFetch";
import Loading from "../../components/Loading";

export default function RideDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = Auth.useUser();

  const [emailMessage, setEmailMessage] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const {
    data: ride,
    error,
    status: pageStatus,
  } = useFetchStatus<Ride, Error>(router.isReady ? `/api/ride/${id}` : null);

  async function send(to: string, message?: string, sender?: string) {
    setIsSendingEmail(true);
    try {
      await basicFetchPostWithAuth("/api/email", { to, message, sender });
      setEmailMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSendingEmail(false);
    }
  }

  if (pageStatus === PageStatus.Error) {
    return <div className="prose w-full max-w-full py-7">{error?.message}</div>;
  }

  if (pageStatus === PageStatus.Success && ride) {
    return (
      <div className="prose py-7">
        <BasicButton onClick={router.back} className="bg-white text-black">
          <div className="flex items-center gap-2">
            <FiArrowLeft /> Back
          </div>
        </BasicButton>

        <h2 className="flex flex-wrap items-center">
          {ride.fromAddr} <FiArrowRight className="mx-2" title="to" />{" "}
          {ride.toAddr}
        </h2>

        <div className="flex items-center gap-3">
          <FiCalendar />
          <time dateTime={new Date(ride.datetime).toISOString()}>
            {new Date(ride.datetime).toLocaleString()}
          </time>
        </div>
        <div className="flex items-center gap-3">
          <FiDollarSign />${ride.price} per seat
        </div>
        <div className="flex items-center gap-3">
          <FiUser />
          {ride.numSeats} seats (availability may differ)
        </div>

        <div className="mt-7 flex w-96 flex-col gap-3 rounded-lg border p-3 shadow-md">
          <BasicInput label="Driver" disabled value={ride.email} expand />

          <BasicTextArea
            textAreaClassName="h-48"
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
            disabled={isSendingEmail}
            label="Message (optional)"
            placeholder="Looking for a ride!"
            expand
          />

          <BasicButton
            disabled={isSendingEmail}
            onClick={() => send(ride.email, emailMessage, user?.email)}
            expand
          >
            Request ride
          </BasicButton>
        </div>
      </div>
    );
  }

  return <Loading />;
}
