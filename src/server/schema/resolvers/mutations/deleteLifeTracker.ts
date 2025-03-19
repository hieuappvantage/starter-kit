import { getDatabaseContext } from '../../../database';
import { GraphQLMutationResolvers } from '../definitions';

const mutation: GraphQLMutationResolvers['deleteLifeTracker'] = async (root, args, context) => {
    const { collections } = await getDatabaseContext();

    const { getTranslations } = context;
    const { t } = await getTranslations(['errors']);

    const lifeTracker = await collections.lifeTrackers.findOne({ _id: args.id });

    if (!lifeTracker) {
        throw new Error(t('errors:resourceNotFound'));
    }

    await collections.lifeTrackers.deleteOne({ _id: args.id });

    return true;
};

export default mutation;
