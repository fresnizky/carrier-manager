import React from "react";
import { useLazyQuery } from "@apollo/client";

import { GET_CARRIERS } from "../graphql/queries";

interface Carrier {
  id: string;
  code: string;
  name: string;
  status: string;
}

const CarrierList: React.FC = () => {
  const [getCarriers, { loading, error, data }] = useLazyQuery<{
    carriers: Carrier[];
  }>(GET_CARRIERS, {
    context: { apiName: "consumer" },
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ marginTop: "1em", width: "100%" }}>
      {error && <p>Error :( {error.message}</p>}
      <button onClick={() => getCarriers()}>Get Carriers</button>
      <ul style={{ flex: 1, listStyle: "none" }}>
        {data?.carriers.map((carrier) => (
          <li key={carrier.id}>
            {carrier.code} - {carrier.name} - {carrier.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarrierList;
