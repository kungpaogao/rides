import { FiGithub } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="min-h-24 flex w-full items-center justify-center gap-2 bg-gray-50 p-10">
      <FiGithub size={18} />
      <a
        className="underline"
        href="https://github.com/kungpaogao/rides/issues"
      >
        Contribute or report an issue
      </a>
    </footer>
  );
}
