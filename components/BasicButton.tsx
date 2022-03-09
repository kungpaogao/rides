import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

type BasicButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  className?: string;
  expand?: boolean;
  flat?: boolean;
};

const BasicButton = forwardRef<HTMLButtonElement, BasicButtonProps>(
  ({ children, className, expand = "", flat = "", ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={`transition d:rounded d:border d:border-black d:bg-black 
        d:px-2 d:py-1 d:text-white ${
          !flat && "d:shadow hover:d:shadow-md focus:d:shadow-md"
        } ${expand && "w-full md:w-auto"} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default BasicButton;
