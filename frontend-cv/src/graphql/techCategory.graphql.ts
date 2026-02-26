import { gql } from '@apollo/client';


const TECHCATEGORIES_GET_QUERY = gql`
    query TechCategories {
        techCategories {
            categoryName
            id
        }
    }
`;

const TECHCATEGORY_TECHSTACK_QUERY = gql`
    query TechCategory($id: ID!) {
        techCategory(id: $id) {
            categoryName
            id
            techStacks {
                id
                techName
                techSvg
            }
        }
    }
`;

export { TECHCATEGORIES_GET_QUERY, TECHCATEGORY_TECHSTACK_QUERY };