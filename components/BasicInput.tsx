import { forwardRef, InputHTMLAttributes } from "react";

export type BasicInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  expand?: boolean;
  error?: string;
};

const BasicInput = forwardRef<HTMLInputElement, BasicInputProps>(
  (
    {
      label,
      className,
      labelClassName,
      inputClassName,
      expand,
      error,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={className}>
        {label && <label className={`block ${labelClassName}`}>{label}</label>}
        <input
          ref={ref}
          className={`rounded border px-2 py-1 ${
            expand && "w-full md:w-auto"
          } ${inputClassName}`}
          {...rest}
        />
        {error && <p className="mt-1 mb-0 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

export default BasicInput;
