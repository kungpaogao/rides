import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode, useState } from "react";

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
      <DropdownMenu.Content
        sideOffset={5}
        align="start"
        className="w-96 rounded-md border bg-white p-1 shadow-md 
        radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down 
        md:w-48"
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
