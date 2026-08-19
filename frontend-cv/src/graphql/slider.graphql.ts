import { gql } from '@apollo/client';

const SLIDERS_GET_QUERY = gql`
    query GetSliders {
    sliders {
        id
        sliderImage
        sliderName
        sliderText
    }
}
`;

const SLIDER_GET_ONE_QUERY = gql`
    query GetSlider($id: ID!) {
      slider(id: $id) {
        id
        sliderImage
        sliderName
        sliderText
        }
    }
`;


const SLIDER_CREATE_MUTATION = gql`
    mutation CreateSlider($createSliderInput: CreateSliderInput!) {
      createSlider(createSliderInput: $createSliderInput) {
        id
        sliderImage
        sliderName
        sliderText
      }
    }
`;

const SLIDER_REMOVE_MUTATION = gql`
    mutation RemoveSlider($id: ID!) {
      removeSlider(id: $id)
    }
`;

const SLIDERS_REMOVE_MUTATION = gql`
    mutation RemoveSliders($ids: [ID!]!) {
      removeSliders(ids: $ids)
    }
`;

const SLIDER_UPDATE_MUTATION = gql`
    mutation UpdateSlider($updateSliderInput: UpdateSliderInput!) {
      updateSlider(updateSliderInput: $updateSliderInput) {
        id
        sliderImage
        sliderName
        sliderText
      }
    }
`;

export { SLIDERS_GET_QUERY, SLIDER_GET_ONE_QUERY, SLIDER_CREATE_MUTATION, SLIDER_REMOVE_MUTATION, SLIDERS_REMOVE_MUTATION, SLIDER_UPDATE_MUTATION };