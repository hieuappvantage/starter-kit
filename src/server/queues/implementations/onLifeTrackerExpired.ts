import { Document } from 'bson';
import { Job } from 'bull';
import _ from 'lodash';
import { getDatabaseContext, LifeStatus } from '../../database';
import publishLifeTrackerNotification from '../../utils/lifeTracker';

export type OnLifeTrackerExpiredMessage = {};

export const onLifeTrackerExpiredHandler = async (message: OnLifeTrackerExpiredMessage, job: Job<Document>) => {
    const { collections } = await getDatabaseContext();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiredLifeTrackers = await collections.lifeTrackers
        .find({
            status: { $nin: [LifeStatus.Completed, LifeStatus.Canceled] },
            date: { $lt: today },
        })
        .toArray();
    await collections.lifeTrackers.updateMany(
        { _id: { $in: expiredLifeTrackers.map(i => i._id) } },
        {
            $set: {
                status: LifeStatus.Canceled,
            },
        }
    );

    const userIds = _.uniq(expiredLifeTrackers.map(u => u.userId.toString()));

    await Promise.all(userIds.map(e => publishLifeTrackerNotification(e)));
};
