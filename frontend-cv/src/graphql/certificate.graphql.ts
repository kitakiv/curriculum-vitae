import { gql } from "@apollo/client";

const CERTIFICATE_GET_QUERY = gql`
    query GetCertificates {
    certificates {
        certificateDescription
        certificateImage
        certificateLink
        certificatePeriodEnd
        certificatePeriodStart
        certificateTitle
        certificateCompany
        id
    }
}
`;

const CERTIFICATE_GET_ONE_QUERY = gql`
    query GetCertificate($id: ID!) {
      certificate(id: $id) {
        certificateCompany
        certificateDescription
        certificateImage
        certificateLink
        certificatePeriodEnd
        certificatePeriodStart
        certificateTitle
        id
        }
    }
`;


const CERTIFICATE_CREATE_MUTATION = gql`
    mutation CreateCertificate($createCertificateInput: CreateCertificateInput!) {
      createCertificate(createCertificateInput: $createCertificateInput) {
        certificateCompany
        certificateDescription
        certificateImage
        certificateLink
        certificatePeriodEnd
        certificatePeriodStart
        certificateTitle
        id
      }
    }
`;

const CERTIFICATE_REMOVE_MUTATION = gql`
    mutation RemoveCertificate($id: ID!) {
      removeCertificate(id: $id)
    }
`;

const CERTIFICATE_UPDATE_MUTATION = gql`
    mutation UpdateCertificate($updateCertificateInput: UpdateCertificateInput!) {
      updateCertificate(updateCertificateInput: $updateCertificateInput) {
        certificateCompany
        certificateDescription
        certificateImage
        certificateLink
        certificatePeriodEnd
        certificatePeriodStart
        certificateTitle
        id
      }
    }
`;


export { CERTIFICATE_GET_QUERY, CERTIFICATE_GET_ONE_QUERY, CERTIFICATE_CREATE_MUTATION, CERTIFICATE_REMOVE_MUTATION, CERTIFICATE_UPDATE_MUTATION };