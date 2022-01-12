import BasicButton from "../components/BasicButton";
import BasicInput from "../components/BasicInput";

export default function NewRide() {
  return (
    <div className="prose w-full md:w-auto">
      <h2>Ride Information</h2>
      <BasicInput expand name="new-from" label="From" placeholder="Ithaca" />
      <BasicInput
        expand
        className="mt-3"
        name="new-to"
        label="To"
        placeholder="Boston"
      />
      <BasicInput
        expand
        className="mt-3"
        name="new-date"
        label="Date"
        type="datetime-local"
      />
      <BasicInput
        expand
        className="mt-3"
        name="new-seats"
        label="Seats"
        type="number"
        defaultValue={0}
        min={0}
      />
      <h2>Contact Information</h2>
      <BasicInput
        expand
        name="new-phone"
        label="Phone number"
        placeholder="1234567890"
        type="tel"
      />
      {/* TODO: regex on netid */}
      <BasicInput
        expand
        className="mt-3"
        name="new-netid"
        label="NetID"
        placeholder="abc123"
      />
      <BasicButton expand>Submit</BasicButton>
    </div>
  );
}
