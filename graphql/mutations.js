import gql from 'graphql-tag';

// MEMBER

export const FLIP_MEMBER_STATUS = gql`
    mutation flipMemberStatus($id: Int!, $status: Boolean!) {
        update_members(where: {id: {_eq: $id}}, _set: {status: $status}) {
            returning {
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
    }
`;

export const CREATE_MEMBER_MUTATION = gql`
    mutation createMember($member: members_insert_input!) {
        insert_members_one(object: $member) {
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

// DEAL

export const CREATE_DEAL_MUTATION = gql`
    mutation createDeal(
        $alcoholType: String!
        $description: String!
        $locationId: uuid!
        $daysActive: [deal_day_insert_input!]!
    ) {
        insert_deals(
            objects: {
                alcoholType: $alcoholType
                description: $description
                locationId: $locationId
                daysActive: {data: $daysActive}
            }
        ) {
            returning {
                id
                description
                alcoholType
                userDeals {
                    upvoted
                    userId
                    id
                }
                daysActive {
                    id
                    dayOfWeek
                    startTime
                    endTime
                    allDay
                }
                location {
                    id
                    name
                }
            }
        }
    }
`;

export const UPDATE_MEMBER_MUTATION = gql`
    mutation updateMember($memberId: Int!, $member: members_set_input!) {
        update_members(where: {id: {_eq: $memberId}}, _set: $member) {
            returning {
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
    }
`;

export const UPDATE_USER_DEAL_MUTATION = gql`
    mutation updateUserDeal($upvoted: Boolean!, $dealId: uuid!, $userId: String!) {
        update_user_deal(where: {dealId: {_eq: $dealId}, userId: {_eq: $userId}}, _set: {upvoted: $upvoted}) {
            returning {
                upvoted
                userId
                id
            }
        }
    }
`;

export const INSERT_USER_DEAL_MUTATION = gql`
    mutation insertUserDeal($upvoted: Boolean!, $dealId: uuid!, $userId: String!) {
        insert_user_deal(objects: {upvoted: $upvoted, dealId: $dealId, userId: $userId}) {
            returning {
                upvoted
                userId
                id
            }
        }
    }
`;
