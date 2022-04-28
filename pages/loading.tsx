import { GetServerSideProps } from "next";
import Loading from "../components/Loading";

type LoadingPageProps = {
  hehe: string,
}

export default function LoadingPage({hehe}: LoadingPageProps) {
  return (
    <div className="p-5">
      <p>{hehe}</p>
      <Loading />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: {hehe: "he".repeat(Math.random()*17 + 2)}}
}