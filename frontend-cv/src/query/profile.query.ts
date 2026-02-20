import { cache } from "react";
import { PROFILE_GET_QUERY } from "@/graphql/profile.graphql";
import { GetProfileQuery } from "@/gql/graphql";
import { apiClient } from "@/lib/api";
import { deafultProfile } from "@/variables/header/header";

async function getProfile() {
  try {
    const res = await apiClient.fetchGraphQL<GetProfileQuery>(PROFILE_GET_QUERY);
    console.log("Raw API response:", res);
    return res.data.data.profile;
  } catch (_) {
    return deafultProfile;
  }
}

export const getProfileCached = cache(getProfile);