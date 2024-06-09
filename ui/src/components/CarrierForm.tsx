import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import PhoneInput, {
  Value,
  isValidPhoneNumber,
} from "react-phone-number-input/min";
import { toast } from "react-toastify";

import "react-phone-number-input/style.css";
import { CREATE_CARRIER } from "../graphql/queries";

import CarrierFormInput from "./CarrierFormInput";
import CarrierFormSelect from "./CarrierFormSelect";

interface CreateCarrierDTO {
  code: string;
  name: string;
  status: string;
}

const CarrierForm: React.FC = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("new");
  const [phone, setPhone] = useState<Value>();

  const [createCarrier, { loading }] = useMutation<
    { createCarrier: CreateCarrierDTO },
    { carrier: CreateCarrierDTO }
  >(CREATE_CARRIER, {
    onCompleted: () => {
      toast.success("Carrier created successfully!");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPhoneNumber(phone as Value)) {
      toast.error("Invalid phone number");
      return;
    }

    createCarrier({
      variables: { carrier: { code, name, status } },
      context: { apiName: "producer" },
    });
    setCode("");
    setName("");
    setStatus("new");
  };

  return (
    <>
      <style>
        {`.PhoneInputCountry {
            position: relative;
            left: 3em; 
          },
        `}
      </style>
      <form
        onSubmit={handleSubmit}
        className="mb-2 flex w-2/3 flex-grow justify-center gap-4"
      >
        <CarrierFormInput
          label="Code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code"
          maxLength={5}
        />
        <CarrierFormInput
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <CarrierFormSelect
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <option value="new">New</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
        </CarrierFormSelect>

        <div className="content-end pb-1.5 pt-2.5">
          <PhoneInput
            placeholder="Enter phone number"
            value={phone}
            onChange={setPhone}
            numberInputProps={{
              className:
                "text-primary-900 placeholder:text-primary-400 block w-[14em] rounded-md border-0 p-0 py-1.5 pl-12 pr-3 sm:text-sm",
            }}
            containerComponentProps={{
              className: "PhoneInput -ml-12",
            }}
          />
        </div>

        <div className="content-end px-3 pb-1.5 pt-2.5">
          <button
            type="submit"
            disabled={loading}
            className="flex-0 rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Create Carrier
          </button>
        </div>
      </form>
    </>
  );
};

export default CarrierForm;
