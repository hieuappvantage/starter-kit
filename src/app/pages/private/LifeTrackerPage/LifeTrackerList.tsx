import { message, TableColumnsType, TableProps } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    LifeCategory,
    LifePriority,
    LifeStatus,
    LifeTracker,
    LifeTrackerFragment,
    LifeTrackerSortingField,
    SortingOrder,
    useDeleteLifeTrackerMutation,
    useListLifeTrackerQuery,
} from '../../../api';
import ExpiredLifeTrackerHandler from '../../../components/LifeTrackerHandler';
import PaginatedTable from '../../../components/PaginatedTable';
import InternalErrorResult from '../../../components/results/InternalErrorResult';
import LifeTrackerEmptyListResult from './LifeTrackerEmptyListResult';
import LifeTrackerListActions from './LifeTrackerListActions';
import LifeTrackerListReducer from './lifeTrackerReducer';

const LifeTrackerList = () => {
    const { t } = useTranslation('lifeTracker');
    const [state, dispatch] = LifeTrackerListReducer();
    const [deleteLifeTracker] = useDeleteLifeTrackerMutation();
    const { page, pageSize, sort } = state;
    const { data, loading, error, refetch } = useListLifeTrackerQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            pagination: { offset: (page - 1) * pageSize, limit: pageSize },
            sort,
        },
    });

    const dataSource = useMemo(
        () =>
            data?.listLifeTracker?.items
                ? data?.listLifeTracker?.items.map(r => ({
                      ...r,
                      key: r.id,
                  }))
                : [],
        [data]
    );

    const total = useMemo(() => data?.listLifeTracker?.count ?? 0, [data]);

    const columns: TableColumnsType<LifeTrackerFragment> = useMemo(
        () => [
            {
                title: 'Event Name',
                dataIndex: 'eventName',
                sorter: true,
            },
            {
                title: 'Category',
                dataIndex: 'category',
                filters: Object.entries(LifeCategory).map(([key, value]) => ({
                    text: value,
                    value: key,
                })),
                filterSearch: true,
                onFilter: (value, record) => record.category.indexOf(value as string) === 0,
                sorter: true,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                filters: Object.entries(LifeStatus).map(([key, value]) => ({
                    text: value,
                    value: key,
                })),
                filterSearch: true,
                onFilter: (value, record) => record.status.indexOf(value as string) === 0,
                sorter: true,
            },
            {
                title: 'Priority',
                dataIndex: 'priority',
                filters: Object.entries(LifePriority).map(([key, value]) => ({
                    text: value,
                    value: key,
                })),
                filterSearch: true,
                onFilter: (value, record) => record.priority.indexOf(value as string) === 0,
                sorter: true,
            },
            {
                title: 'Date',
                dataIndex: 'date',
                render: (_, record) => <>{dayjs(record.date).format('YYYY-MM-DD')}</>,
                sorter: true,
            },
            {
                title: 'Action',
                key: 'action',
                render: (_, record) => (
                    <LifeTrackerListActions deleteLifeTracker={() => deletefn(record)} lifeTrackerId={record.id} />
                ),
            },
        ],
        []
    );

    if (!loading) {
        if (error) {
            return <InternalErrorResult />;
        }
        if (dataSource.length === 0) {
            return <LifeTrackerEmptyListResult />;
        }
    }

    const deletefn = useMemo(
        () => async (lifeTracker: LifeTrackerFragment) => {
            const result = await deleteLifeTracker({ variables: { id: lifeTracker.id } });
            if (result) {
                message.info({
                    type: 'info',
                    content: t('lifeTracker:delete.messages.deleteSuccess'),
                    duration: 3,
                });
                refetch();
            } else {
                message.error({
                    type: 'error',
                    content: t('lifeTracker:delete.messages.error'),
                    duration: 3,
                });
            }
        },
        []
    );

    const handleTableChange: TableProps<LifeTracker>['onChange'] = useMemo(
        () => (pagination, filters, sorter: SorterResult<LifeTracker>) => {
            if (!sorter.order) {
                dispatch({
                    type: 'sort',
                    sort: null,
                });

                return;
            }

            let fieldChange = LifeTrackerSortingField.EventName;
            switch (sorter.field.toString().toLowerCase()) {
                case LifeTrackerSortingField.Category.toLowerCase():
                    fieldChange = LifeTrackerSortingField.Category;
                    break;
                case LifeTrackerSortingField.Priority.toLowerCase():
                    fieldChange = LifeTrackerSortingField.Priority;
                    break;
                case LifeTrackerSortingField.Status.toLowerCase():
                    fieldChange = LifeTrackerSortingField.Status;
                    break;
            }

            dispatch({
                type: 'sort',
                sort: {
                    field: fieldChange,
                    order: sorter.order === 'descend' ? SortingOrder.Desc : SortingOrder.Asc,
                },
            });
        },
        []
    );

    return (
        <>
            <ExpiredLifeTrackerHandler callback={refetch} />
            <PaginatedTable
                columns={columns}
                dataSource={dataSource}
                dispatch={dispatch}
                loading={loading}
                onChange={handleTableChange}
                rowKey="key"
                state={state}
                total={total}
            />
        </>
    );
};

export default LifeTrackerList;
