import getPubSub from '../../../core/pubSub';
import { GraphQLSubscriptionResolvers } from '../definitions';

export const lifeTrackerPubSub = getPubSub();
const resolver: GraphQLSubscriptionResolvers['listenLifeTrackerNotification'] = {
    // @ts-ignore
    subscribe: async (rootValue, args, { getUser }) => {
        const user = await getUser();
        const channels = [`gql.life.tracker.notification.${user._id.toString()}`];

        return lifeTrackerPubSub.asyncIterator(channels);
    },
};

export default resolver;
