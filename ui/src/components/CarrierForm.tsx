import React, { useState } from "react";
import { useMutation } from "@apollo/client";
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

  const [createCarrier, { data, loading, error }] = useMutation<
    { createCarrier: CreateCarrierDTO },
    { carrier: CreateCarrierDTO }
  >(CREATE_CARRIER);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCarrier({
      variables: { carrier: { code, name, status } },
      context: { apiName: "producer" },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <option value="ending">Pending</option>
      </select>
      <button type="submit">Create Carrier</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Carrier created successfully!</p>}
    </form>
  );
};

export default CarrierForm;
