import { lifeTrackerPubSub } from '../schema/resolvers/subscriptions/listenLifeTrackerNotification';

type LifeTrackerNotificationMessage = {
    date: Date;
    isUpdated: boolean;
};

export type LifeTrackerNotification = LifeTrackerNotificationMessage;

const publishLifeTrackerNotification = (userId: string) => {
    const message: LifeTrackerNotification = {
        date: new Date(),
        isUpdated: true,
    };
    lifeTrackerPubSub.publish(`gql.life.tracker.notification.${userId}`, {
        listenLifeTrackerNotification: message,
    });
};

export default publishLifeTrackerNotification;
