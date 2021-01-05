import gql from 'graphql-tag';

import {subYears, formatISO} from 'date-fns';

// configuration of dates
const actual_year = new Date();

const child_begin = formatISO(actual_year, {representation: 'date'});
const child_end = formatISO(subYears(actual_year, 11), {representation: 'date'});

const teen_begin = formatISO(subYears(actual_year, 12), {representation: 'date'});
const teen_end = formatISO(subYears(actual_year, 17), {representation: 'date'});

const young_begin = formatISO(subYears(actual_year, 18), {representation: 'date'});
const young_end = formatISO(subYears(actual_year, 36), {representation: 'date'});

const adult_begin = formatISO(subYears(actual_year, 37), {representation: 'date'});
const adult_end = formatISO(subYears(actual_year, 59), {representation: 'date'});

const old_begin = formatISO(subYears(actual_year, 60), {representation: 'date'});
const old_end = formatISO(subYears(actual_year, 1000), {representation: 'date'});

export const BIRTHDAYS_BY_MONTH_QUERY = gql`
    query BirthdaysByMonth($month: float8!) {
        byMonth: birthdays_by_month(
            where: {month: {_eq: $month}, status: {_eq: true}}
            order_by: {day: asc, name: asc}
        ) {
            day
            id
            name
            cellphone
            birth
        }
    }
`;

export const DASHBOARD_QUERY = gql`
    query DashboardQuery {
        MALE: members_aggregate(where: {gender: {_eq: "masculino"}, status: {_eq: true}}) {
            aggregate {
                count
            }
        }
        FEMALE: members_aggregate(where: {gender: {_eq: "feminino"}, status: {_eq: true}}) {
            aggregate {
                count
            }
        }
        MEMBERS_ACTIVE: members_aggregate(where: {status: {_eq: true}, is_member_or_assist: {_eq: "Membro"}}) {
            aggregate {
                count
            }
        }
        MEMBERS_INACTIVE: members_aggregate(where: {status: {_eq: false}, is_member_or_assist: {_eq: "Membro"}}) {
            aggregate {
                count
            }
        }
        ASSISTENTS_ACTIVE: members_aggregate(where: {status: {_eq: true}, is_member_or_assist: {_eq: "Assistente"}}) {
            aggregate {
                count
            }
        }
        ASSISTENTS_INACTIVE: members_aggregate(
            where: {status: {_eq: false}, is_member_or_assist: {_eq: "Assistente"}}
        ) {
            aggregate {
                count
            }
        }
        ANCIENT_ACTIVE: members_aggregate(
            where: {status: {_eq: true}, birth: {_gte: "${old_end}", _lte: "${old_begin}"}}
        ) {
            aggregate {
                count
            }
        }
        ADULT_ACTIVE: members_aggregate(where: {status: {_eq: true}, birth: {_gte: "${adult_end}", _lte: "${adult_begin}"}}) {
            aggregate {
                count
            }
        }
        YOUNG_ACTIVE: members_aggregate(where: {status: {_eq: true}, birth: {_gte: "${young_end}", _lte: "${young_begin}"}}) {
            aggregate {
                count
            }
        }
        TEEN_ACTIVE: members_aggregate(where: {status: {_eq: true}, birth: {_gte: "${teen_end}", _lte: "${teen_begin}"}}) {
            aggregate {
                count
            }
        }
        CHILDREEN_ACTIVE: members_aggregate(
            where: {status: {_eq: true}, birth: {_gte: "${child_end}", _lte: "${child_begin}"}}
        ) {
            aggregate {
                count
            }
        }
    }
`;
