import { ObjectId } from 'mongodb';
import { getDatabaseContext, LifeTracker } from '../../../database';
import { InvalidInput } from '../../errors';
import { requiresLoggedUser } from '../../middlewares';
import { GraphQLMutationResolvers } from '../definitions';

const mutation: GraphQLMutationResolvers['addLifeTracker'] = async (root, args, context) => {
    const { collections } = await getDatabaseContext();
    const { _id } = await context.getUser();

    if (!args.lifeTracker) {
        throw new InvalidInput();
    }

    const lifeTracker: LifeTracker = {
        _id: new ObjectId(),
        category: args.lifeTracker.category,
        date: args.lifeTracker.date,
        eventName: args.lifeTracker.eventName,
        priority: args.lifeTracker.priority,
        status: args.lifeTracker.status,
        userId: _id,
    };

    await collections.lifeTrackers.insertOne(lifeTracker);

    return lifeTracker;
};

export default requiresLoggedUser(mutation);
