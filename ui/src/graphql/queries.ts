import { gql } from "@apollo/client";

export const GET_CARRIERS = gql`
  query GetCarriers {
    carriers {
      id
      code
      name
      status
      phonenumber
    }
  }
`;

export const CREATE_CARRIER = gql`
  mutation CreateCarrier($carrier: CreateCarrierDTO!) {
    createCarrier(carrier: $carrier) {
      code
      name
      status
      phonenumber
    }
  }
`;

export const UPDATE_CARRIER = gql`
  mutation UpdateCarrier($carrierId: Float!, $carrier: CreateCarrierDTO!) {
    updateCarrier(carrierId: $carrierId, carrier: $carrier) {
      id
      code
      name
      status
      phonenumber
    }
  }
`;
