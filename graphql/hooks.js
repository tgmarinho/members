import {useQuery} from '@apollo/react-hooks';
import {GET_MEMBERS_QUERY} from './queries';
import {DASHBOARD_QUERY, BIRTHDAYS_BY_MONTH_QUERY} from './queries_dashboard';

export const useMembers = () => {
    const {loading, error, data} = useQuery(GET_MEMBERS_QUERY);

    if (!loading && data?.members) {
        return {
            loading,
            error,
            data: {
                members: data.members,
            },
        };
    }

    return {
        loading,
        error,
        data,
    };
};

export const useDashboard = () => {
    const {loading, error, data} = useQuery(DASHBOARD_QUERY);

    if (!loading && !!data) {
        return {
            loading,
            error,
            data: {
                ...Object.keys(data).reduce((acc, curr) => {
                    let item = {[curr]: data[curr].aggregate.count};
                    return {...acc, ...item};
                }, {}),
            },
        };
    }

    return {
        loading,
        error,
        data,
    };
};

export const useBirthdaysByMonth = (month) => {
    const {loading, error, data} = useQuery(BIRTHDAYS_BY_MONTH_QUERY, {
        variables: {month},
    });

    if (!loading && !!data) {
        return {
            loadingBirthdays: loading,
            error,
            birthdays: data,
        };
    }

    return {
        loadingBirthdays: loading,
        error,
        birthdays: data,
    };
};
