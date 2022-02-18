import { useRouter } from "next/router";

export default function RideDetail() {
  const router = useRouter();
  const { id } = router.query;
  return <>ride: {id}</>;
}
