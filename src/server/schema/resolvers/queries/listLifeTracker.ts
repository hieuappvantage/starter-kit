import { Sort } from 'mongodb';
import { getDatabaseContext } from '../../../database';
import { getSortingValue, paginateAggregation } from '../../../utils/pagination';
import { GraphQLLifeTrackerSortingRule, GraphQLQueryResolvers, LifeTrackerSortingField, Maybe } from '../definitions';

const getSort = (rule?: Maybe<GraphQLLifeTrackerSortingRule>) => {
    // always sort by ID for consistency
    const sort: Sort = { _id: 1 };

    if (!rule) {
        return sort;
    }

    switch (rule.field) {
        case LifeTrackerSortingField.Category:
            return { category: getSortingValue(rule.order), ...sort };

        case LifeTrackerSortingField.EventName:
            return { eventName: getSortingValue(rule.order), ...sort };

        case LifeTrackerSortingField.Priority:
            return { priority: getSortingValue(rule.order), ...sort };

        case LifeTrackerSortingField.Status:
            return { status: getSortingValue(rule.order), ...sort };
        default:
            throw new Error('Sorting field not supported');
    }
};

const query: GraphQLQueryResolvers['listLifeTracker'] = async (root, { pagination, sort }, context) => {
    const { collections } = await getDatabaseContext();
    const { _id } = await context.getUser();

    return paginateAggregation(
        collections.lifeTrackers,
        [{ $match: { userId: _id } }, { $sort: getSort(sort) }],
        pagination
    );
};

export default query;
