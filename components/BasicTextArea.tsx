import { forwardRef, TextareaHTMLAttributes } from "react";

export type BasicTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  className?: string;
  labelClassName?: string;
  textAreaClassName?: string;
  expand?: boolean;
  error?: string;
};

const BasicTextArea = forwardRef<HTMLTextAreaElement, BasicTextAreaProps>(
  (
    {
      name,
      label,
      className = "",
      labelClassName = "",
      textAreaClassName = "",
      expand = "",
      error,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={className}>
        {label && (
          <label htmlFor={name} className={`block ${labelClassName}`}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`rounded border px-2 py-1 disabled:bg-gray-100 ${
            expand && "w-full"
          } ${textAreaClassName}`}
          id={name}
          name={name}
          {...rest}
        />
        {error && <p className="mt-1 mb-0 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

export default BasicTextArea;
