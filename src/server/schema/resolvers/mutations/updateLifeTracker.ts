import { getDatabaseContext } from '../../../database';
import { GraphQLMutationResolvers } from '../definitions';

const mutation: GraphQLMutationResolvers['updateLifeTracker'] = async (root, args, context) => {
    const { collections } = await getDatabaseContext();
    const { getTranslations } = context;
    const { t } = await getTranslations(['errors']);

    const lifeTracker = await collections.lifeTrackers.findOne({ _id: args.id });
    if (!lifeTracker) {
        throw new Error(t('errors:resourceNotFound'));
    }

    lifeTracker.category = args.lifeTracker.category;
    lifeTracker.date = args.lifeTracker.date;
    lifeTracker.eventName = args.lifeTracker.eventName;
    lifeTracker.priority = args.lifeTracker.priority;
    lifeTracker.status = args.lifeTracker.status;

    await collections.lifeTrackers.updateOne(
        {
            _id: args.id,
        },
        {
            $set: lifeTracker,
        }
    );

    return lifeTracker;
};

export default mutation;
