import { getDatabaseContext } from '../../../database';
import { GraphQLQueryResolvers } from '../definitions';

const query: GraphQLQueryResolvers['getLifeTrackerById'] = async (root, args, context) => {
    const { collections } = await getDatabaseContext();

    return collections.lifeTrackers.findOne({ _id: args.id });
};

export default query;
