import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';
import {
    ListenLifeTrackerNotificationDocument,
    ListenLifeTrackerNotificationSubscription,
    ListenLifeTrackerNotificationSubscriptionVariables,
} from '../api';

type LifeTrackerHandlerProps = {
    callback: () => void;
};

const ExpiredLifeTrackerHandler = ({ callback }: LifeTrackerHandlerProps) => {
    const apolloClient = useApolloClient();

    useEffect(() => {
        const observer = apolloClient.subscribe<
            ListenLifeTrackerNotificationSubscription,
            ListenLifeTrackerNotificationSubscriptionVariables
        >({
            query: ListenLifeTrackerNotificationDocument,
        });

        const subscription = observer.subscribe({
            next({ data }) {
                callback();
            },
            error(err) {
                console.error('Subscription error:', err);
            },
        });

        return () => subscription.unsubscribe();
    }, [apolloClient, callback]);

    return null;
};

export default ExpiredLifeTrackerHandler;
