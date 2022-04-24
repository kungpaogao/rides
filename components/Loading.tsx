import Image from "next/image";
import carLoading from "../public/car-road.gif";

export default function Loading() {
  return <Image src={carLoading} alt="Loading..." />;
}
