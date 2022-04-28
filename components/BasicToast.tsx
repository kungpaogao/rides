import * as Toast from "@radix-ui/react-toast";
import { Dispatch, SetStateAction } from "react";
import BasicButton from "./BasicButton";

type BasicToastProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  closeLabel?: string;
  actionLabel?: string;
  onActionClick?: () => void;
};

export default function BasicToast({
  open,
  setOpen,
  title,
  description,
  closeLabel = "Dismiss",
  actionLabel,
  onActionClick,
}: BasicToastProps) {
  return (
    <Toast.Provider>
      <Toast.Root
        className="radix-swipe-end:animate-toast-swipe-out 
        translate-x-radix-toast-swipe-move-x radix-swipe-cancel:translate-x-0 
        radix-swipe-cancel:duration-200 radix-swipe-cancel:ease-[ease] 
        flex items-center rounded-lg border bg-white px-4 py-3 shadow-lg
        radix-state-open:animate-toast-slide-in-bottom 
        radix-state-closed:animate-toast-hide 
        md:radix-state-open:animate-toast-slide-in-right"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="flex-1 px-2">
          <Toast.Title className="font-semibold">{title}</Toast.Title>
          <Toast.Description className="mt-1">{description}</Toast.Description>
        </div>
        <div className="ml-7 flex flex-col gap-2">
          {actionLabel && onActionClick && (
            <Toast.Action asChild altText={actionLabel}>
              <BasicButton
                onClick={onActionClick}
                className="border-none font-semibold"
                flat
              >
                {actionLabel}
              </BasicButton>
            </Toast.Action>
          )}
          <Toast.Close asChild>
            <BasicButton className="border-none" flat>
              {closeLabel}
            </BasicButton>
          </Toast.Close>
        </div>
      </Toast.Root>
      <Toast.Viewport
        className="fixed bottom-0 right-0 z-50 w-full p-3 md:w-auto
      md:p-6"
      />
    </Toast.Provider>
  );
}
