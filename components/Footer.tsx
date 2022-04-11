import { FiGithub } from "react-icons/fi";

export default function Footer() {
  return (
    <div className="mt-12 flex h-24 w-full items-center justify-center gap-2 bg-gray-50">
      <FiGithub size={18} />
      <a
        className="underline"
        href="https://github.com/kungpaogao/rides/issues"
      >
        Contribute or report an issue
      </a>
    </div>
  );
}
