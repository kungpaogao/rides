import { forwardRef, InputHTMLAttributes } from "react";

type BasicInputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  expand?: boolean;
};

const BasicInput = forwardRef<HTMLInputElement, BasicInputProps>(
  (
    { name, label, className, labelClassName, inputClassName, expand, ...rest },
    ref
  ) => {
    return (
      <div className={className}>
        <label htmlFor={name} className={`block ${labelClassName}`}>
          {label}
        </label>
        <input
          id={name}
          ref={ref}
          className={`border rounded px-2 py-1 ${
            expand && "w-full md:w-auto"
          } ${inputClassName}`}
          {...rest}
        />
      </div>
    );
  }
);

export default BasicInput;
