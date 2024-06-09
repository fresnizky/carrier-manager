import { InputHTMLAttributes } from "react";

type CarrierFormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function CarrierFormInput({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
}: CarrierFormInputProps) {
  return (
    <div className="rounded-md px-3 pb-1.5 pt-2.5">
      <label
        htmlFor="name"
        className="text-primary-900 block text-xs font-medium"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="text-primary-900 placeholder:text-primary-400 block w-full rounded-md border-0 p-0 py-1.5 pl-3 pr-3 sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default CarrierFormInput;
