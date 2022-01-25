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
        className={`mt-3 rounded border px-2 py-1 shadow transition hover:shadow-md ${
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
