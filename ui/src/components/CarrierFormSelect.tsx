import { InputHTMLAttributes } from "react";

type CarrierFormSelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  label: string;
};

function CarrierFormSelect({
  label,
  name,
  value,
  onChange,
  children,
}: CarrierFormSelectProps) {
  return (
    <div className="rounded-md px-3 pb-1.5 pt-2.5">
      <label
        htmlFor={name}
        className="text-primary-900 block text-xs font-medium"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="text-primary-900 ring-primary-300 focus:ring-secondary-600 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset focus:ring-2 sm:text-sm sm:leading-6"
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
}

export default CarrierFormSelect;
