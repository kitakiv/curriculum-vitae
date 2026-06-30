import { cache } from "react";
import { PROFILE_GET_QUERY } from "@/graphql/profile.graphql";
import { GetProfileQuery } from "@/gql/graphql";
import { apiClient } from "@/lib/api";
import { deafultProfile } from "@/variables/header/header";

async function getProfile() {
  try {
    const res = await apiClient.fetchGraphQL<{data: GetProfileQuery}>(PROFILE_GET_QUERY);
    if (!res.data.data.profile.profilePhotos) {
      res.data.data.profile.profilePhotos = deafultProfile.profilePhotos as string[];
    }
    return res.data.data.profile;
  } catch (_) {
    return deafultProfile;
  }
}

export const getProfileCached = cache(getProfile);