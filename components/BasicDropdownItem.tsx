import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";

type BasicDropdownItemProps = DropdownMenu.DropdownMenuItemProps & {
  children?: ReactNode;
};

export default function BasicDropdownItem({
  children,
  className,
  ...rest
}: BasicDropdownItemProps) {
  return (
    <DropdownMenu.Item
      className={`rounded px-2 py-1 focus:bg-slate-100 ${className}`}
      {...rest}
    >
      {children}
    </DropdownMenu.Item>
  );
}
