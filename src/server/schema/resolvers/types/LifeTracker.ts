import { GraphQLLifeTrackerResolvers } from '../definitions';

const LifeTrackerGraphQL: GraphQLLifeTrackerResolvers = {
    id: (root, args) => root._id,
    user: async (root, args, { getUser }) => {
        const user = await getUser();

        return user;
    },
};

export default LifeTrackerGraphQL;
