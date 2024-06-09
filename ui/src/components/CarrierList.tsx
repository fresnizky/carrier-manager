import { useLazyQuery } from "@apollo/client";
import React from "react";
import { toast } from "react-toastify";

import { GET_CARRIERS } from "../graphql/queries";

interface Carrier {
  id: string;
  code: string;
  name: string;
  status: string;
}

const CarrierList: React.FC = () => {
  const [getCarriers, { loading, data }] = useLazyQuery<{
    carriers: Carrier[];
  }>(GET_CARRIERS, {
    context: { apiName: "consumer" },
    fetchPolicy: "no-cache",
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-2/3">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-primary-900">
            Carrier
          </h1>
          <p className="mt-2 text-sm text-secondary-700">
            A list of all the users in the system including their code, name,
            status and phone number.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            onClick={() => getCarriers()}
          >
            Get Carriers
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-secondary-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-secondary-900 sm:pl-0"
                  >
                    Code
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-secondary-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-secondary-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-secondary-900"
                  >
                    Phone Number
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary-200">
                {data?.carriers.map((carrier) => (
                  <tr key={carrier.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-secondary-900 sm:pl-0">
                      {carrier.code}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-secondary-700">
                      {carrier.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-secondary-700">
                      {carrier.status}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-secondary-700">
                      {/* {carrier.phonenumber} */}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        href="#"
                        className="text-primary-600 hover:text-primary-900"
                      >
                        Edit<span className="sr-only">, {carrier.code}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrierList;
