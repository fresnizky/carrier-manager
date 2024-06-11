import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { FaCircleCheck, FaCircleXmark, FaPenToSquare } from "react-icons/fa6";
import PhoneInput, { Value } from "react-phone-number-input/min";
import { toast } from "react-toastify";

import { GET_CARRIERS, UPDATE_CARRIER } from "../graphql/queries";
interface Carrier {
  id: string;
  code: string;
  name: string;
  status: string;
  phonenumber: Value | undefined;
}

interface UpdateCarrierDTO {
  code: string;
  name: string;
  status: string;
  phonenumber: Value | undefined;
}

const CarrierList: React.FC = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [phonenumber, setPhonenumber] = useState<Value | undefined>();
  const [carrierId, setCarrierId] = useState("");
  const [getCarriers, { loading, data }] = useLazyQuery<{
    carriers: Carrier[];
  }>(GET_CARRIERS, {
    context: { apiName: "consumer" },
    fetchPolicy: "no-cache",
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const [updateCarrier] = useMutation<
    { updateCarrier: UpdateCarrierDTO },
    { carrierId: number; carrier: UpdateCarrierDTO }
  >(UPDATE_CARRIER, {
    onCompleted: () => {
      toast.success("Carrier updated successfully!");
      setCarrierId("");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleEditCarrier = (carrier: Carrier) => {
    setCarrierId(carrier.id);
    setCode(carrier.code);
    setName(carrier.name);
    setStatus(carrier.status);
    setPhonenumber(carrier.phonenumber);
  };

  const handleEditCarrierSubmit = async () => {
    const carrier = { code, name, status, phonenumber };
    await updateCarrier({
      variables: {
        carrierId: parseInt(carrierId),
        carrier,
      },
      context: { apiName: "producer" },
    });
  };

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
                      {carrierId === carrier.id ? (
                        <input
                          value={code}
                          className="block w-full rounded-md border-0 p-0 py-1.5 pl-3 pr-3 text-primary-900 placeholder:text-primary-400 sm:text-sm"
                          onChange={(e) => setCode(e.target.value)}
                        />
                      ) : (
                        carrier.code
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-secondary-700">
                      {carrierId === carrier.id ? (
                        <input
                          value={name}
                          className="block w-full rounded-md border-0 p-0 py-1.5 pl-3 pr-3 text-primary-900 placeholder:text-primary-400 sm:text-sm"
                          onChange={(e) => setName(e.target.value)}
                        />
                      ) : (
                        carrier.name
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-secondary-700">
                      {carrierId === carrier.id ? (
                        <select
                          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-primary-900 ring-1 ring-inset ring-primary-300 focus:ring-2 focus:ring-secondary-600 sm:text-sm sm:leading-6"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="new">New</option>
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                        </select>
                      ) : (
                        carrier.status
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-secondary-700">
                      {carrierId === carrier.id ? (
                        <PhoneInput
                          value={phonenumber}
                          onChange={setPhonenumber}
                          numberInputProps={{
                            className:
                              "text-primary-900 placeholder:text-primary-400 block w-[14em] rounded-md border-0 p-0 py-1.5 pl-12 pr-3 sm:text-sm",
                          }}
                          containerComponentProps={{
                            className: "PhoneInput -ml-12",
                          }}
                        />
                      ) : (
                        carrier.phonenumber
                      )}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      {carrierId === carrier.id ? (
                        <div className="flex gap-2">
                          <a onClick={handleEditCarrierSubmit}>
                            <FaCircleCheck size="2em" color="green" />
                          </a>
                          <a onClick={() => setCarrierId("")}>
                            <FaCircleXmark size="2em" color="red" />
                          </a>
                        </div>
                      ) : (
                        <a
                          onClick={() => handleEditCarrier(carrier)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <FaPenToSquare />
                        </a>
                      )}
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
