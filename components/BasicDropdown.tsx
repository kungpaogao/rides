import { Transition } from "@headlessui/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Fragment, ReactNode, useState } from "react";

type BasicDropdownProps = {
  trigger?: ReactNode;
  children?: ReactNode;
};

export default function BasicDropdown({
  trigger,
  children,
}: BasicDropdownProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <DropdownMenu.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <Transition
        show={isMenuOpen}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <DropdownMenu.Content
          sideOffset={5}
          align="start"
          className="w-96 rounded-md border bg-white p-1 shadow-md md:w-48"
        >
          {children}
        </DropdownMenu.Content>
      </Transition>
    </DropdownMenu.Root>
  );
}
