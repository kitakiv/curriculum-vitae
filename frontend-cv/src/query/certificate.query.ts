import { cache } from "react";
import { GetCertificatesQuery } from "@/gql/graphql";
import { apiClient } from "@/lib/api";
import { CERTIFICATE_GET_QUERY } from "@/graphql/certificate.graphql";

async function getCertificates() {
  try {
    const res = await apiClient.fetchGraphQL<{data: GetCertificatesQuery}>(CERTIFICATE_GET_QUERY);
    return res.data.data.certificates;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export const getCertificatesCached = cache(getCertificates);