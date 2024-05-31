import { gql } from "@apollo/client";

export const GET_CARRIERS = gql`
  query GetCarriers {
    carriers {
      id
      code
      name
      status
    }
  }
`;

export const CREATE_CARRIER = gql`
  mutation CreateCarrier($carrier: CreateCarrierDTO!) {
    createCarrier(carrier: $carrier) {
      code
      name
      status
    }
  }
`;
