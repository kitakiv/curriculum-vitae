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

export { SLIDERS_GET_QUERY };