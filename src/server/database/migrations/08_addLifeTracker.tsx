import { ObjectId } from 'mongodb';
import { LifeCategory, LifePriority, LifeStatus, LifeTracker } from '../documents';
import { DatabaseContext } from '../instance';

export default {
    identifier: '08_addLifeTracker',

    async up({ regular: { db } }: DatabaseContext): Promise<void> {
        const user = await db.collection('users').findOne({});

        const lifeTracker: LifeTracker = {
            _id: new ObjectId(),
            category: LifeCategory.Travel,
            date: new Date('2025-05-18'),
            eventName: 'Vacation to Singapore',
            status: LifeStatus.Ongoing,
            priority: LifePriority.Medium,
            userId: user._id,
        };
        await db.collection('lifeTrackers').insertOne(lifeTracker);
    },
};
