import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

type BasicButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  className?: string;
  expand?: boolean;
};

const BasicButton = forwardRef<HTMLButtonElement, BasicButtonProps>(
  ({ children, className, expand, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={`border rounded shadow px-2 py-1 mt-3 hover:shadow-md transition ${
          expand && "w-full md:w-auto"
        } ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default BasicButton;
