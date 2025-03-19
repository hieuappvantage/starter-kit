import { useReducer } from 'react';
import { LifeTrackerSortingRule } from '../../../api';
import { PageAction, PageState } from '../../../components/PaginatedTable';

type State = PageState & {
    sort?: LifeTrackerSortingRule;
};

type SortAction = { type: 'sort'; sort: LifeTrackerSortingRule };

type Action = PageAction | SortAction;

const pageReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setPage':
            return { ...state, page: action.page };
        case 'setPageSize':
            return { ...state, page: 0, pageSize: action.pageSize };
        case 'sort':
            return { ...state, sort: action.sort };

        default:
            return state;
    }
};

const LifeTrackerListReducer = () =>
    useReducer(pageReducer, {
        page: 1,
        pageSize: 10,
    });

export default LifeTrackerListReducer;
