import { cache } from "react";
import { SLIDERS_GET_QUERY } from "@/graphql/slider.graphql";
import { GetSlidersQuery, Slider } from "@/gql/graphql";
import { apiClient } from "@/lib/api";
import { defaultSliders } from "@/variables/aboutme/aboutme";



async function getSliders() {
  try {
    const res = await apiClient.fetchGraphQL<{data: GetSlidersQuery}>(SLIDERS_GET_QUERY);
    if (!res.data.data.sliders || res.data.data.sliders.length === 0) {
      return defaultSliders;
    }
    return res.data.data.sliders;
  } catch (_) {
    return defaultSliders as unknown as Slider[];
  }
}

export const getSlidersCached = cache(getSliders);