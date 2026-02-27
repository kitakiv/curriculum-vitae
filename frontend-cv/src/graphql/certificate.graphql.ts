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

export { CERTIFICATE_GET_QUERY };