import gql from 'graphql-tag';
// where: {status: {_eq: $status}},
export const GET_MEMBERS_QUERY = gql`
    query getMembers {
        members(order_by: {name: asc}) {
            id
            name
            address
            birth
            cellphone
            email
            gender
            is_member_or_assist
            member_at
            last_update_at
            obs
            status
        }
    }
`;

export const GET_LOCATIONS_QUERY = gql`
    query {
        locations {
            id
            name
            address
            imageUrl
            lat
            long
            city {
                id
                name
                state
                zip
            }
            deals {
                id
            }
        }
    }
`;

export const GET_CITIES_QUERY = gql`
    query {
        cities {
            id
            zip
            state
            name
            mapZoom
            long
            lat
        }
    }
`;
