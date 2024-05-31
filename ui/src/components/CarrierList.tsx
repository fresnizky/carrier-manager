import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CARRIERS } from "../graphql/queries";

interface Carrier {
  id: string;
  code: string;
  name: string;
  status: string;
}

const CarrierList: React.FC = () => {
  const { loading, error, data } = useQuery<{ carriers: Carrier[] }>(
    GET_CARRIERS,
    { context: { apiName: "consumer" } }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {error.message}</p>;

  return (
    <ul>
      {data?.carriers.map((carrier) => (
        <li key={carrier.id}>
          {carrier.code} - {carrier.name} - {carrier.status}
        </li>
      ))}
    </ul>
  );
};

export default CarrierList;
