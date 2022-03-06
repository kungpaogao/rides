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

export default function RideDetail() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: ride,
    error,
    status: pageStatus,
  } = useFetchStatus<Ride, Error>(router.isReady ? `/api/ride/${id}` : null);

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
          {ride.fromAddr} <FiArrowRight className="mx-2" /> {ride.toAddr}
        </h2>

        <div className="flex items-center gap-3">
          <FiCalendar /> {new Date(ride.datetime).toLocaleString()}
        </div>
        <div className="flex items-center gap-3">
          <FiDollarSign />${ride.price} per seat
        </div>
        <div className="flex items-center gap-3">
          <FiUser />
          {ride.numSeats} seats (availability may differ)
        </div>

        <div className="mt-7 flex w-fit flex-col gap-3 rounded-lg border p-3 shadow-md">
          <BasicInput label="Driver" disabled value={ride.email} />

          <BasicTextArea
            label="Message (optional)"
            placeholder="Looking for a ride!"
          />
          <BasicButton>Request ride</BasicButton>
        </div>
      </div>
    );
  }

  return <>Loading...</>;
}
