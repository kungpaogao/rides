import { forwardRef, InputHTMLAttributes } from "react";

type BasicInputProps = InputHTMLAttributes<HTMLInputElement> & {
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
        <label className={`block ${labelClassName}`}>{label}</label>
        <input
          ref={ref}
          className={`border rounded px-2 py-1 ${
            expand && "w-full md:w-auto"
          } ${inputClassName}`}
          {...rest}
        />
        {error && <p className="text-red-600 mt-1 mb-0 text-sm">{error}</p>}
      </div>
    );
  }
);

export default BasicInput;
