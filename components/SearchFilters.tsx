import BasicButton from "./BasicButton";

type SearchFiltersProps = {
  className?: string;
};

export default function SearchFilters({ className }: SearchFiltersProps) {
  return (
    <div className={`flex w-full flex-row gap-3 ${className}`}>
      <BasicButton className="rounded-full bg-white px-3 text-black">
        Price
      </BasicButton>
      <BasicButton className="rounded-full bg-white px-3 text-black">
        Dates <span>{" ±10 days"}</span>
      </BasicButton>
      <BasicButton className="rounded-full bg-white px-3 text-black">
        Distance
      </BasicButton>
      <BasicButton className="rounded-full bg-white px-3 text-black">
        Time
      </BasicButton>
    </div>
  );
}
