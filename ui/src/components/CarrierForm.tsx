import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { CREATE_CARRIER } from "../graphql/queries";

interface CreateCarrierDTO {
  code: string;
  name: string;
  status: string;
}

const CarrierForm: React.FC = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("new");

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
    createCarrier({
      variables: { carrier: { code, name, status } },
      context: { apiName: "producer" },
    });
    setCode("");
    setName("");
    setStatus("new");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "1em" }}
      className="flex gap-4"
    >
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Code"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="new">New</option>
        <option value="active">Active</option>
        <option value="pending">Pending</option>
      </select>
      <button type="submit" disabled={loading} className="bg-slate-400">
        Create Carrier
      </button>
    </form>
  );
};

export default CarrierForm;
