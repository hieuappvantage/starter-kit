import { Card, message, Space } from 'antd';
import dayjs from 'dayjs';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import {
    CreateLifeTrackerInput,
    LifeCategory,
    LifePriority,
    LifeStatus,
    useGetLifeTrackerbyIdQuery,
    useUpdateLifeTrackerMutation,
} from '../../../api';
import ConsolePageWithHeader from '../../../layouts/ConsoleLayout/ConsolePageWithHeader';
import useHandleError from '../../../utilities/useHandleError';
import LifeTrackerForm, { FormValues } from './LifeTrackerForm';

const EditLifeTrackerPage = () => {
    const { t } = useTranslation('lifeTracker');
    const { lifeTrackerId } = useParams<{ lifeTrackerId: string }>();
    const navigate = useNavigate();
    const [updateLifeTracker] = useUpdateLifeTrackerMutation();

    const { data } = useGetLifeTrackerbyIdQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
            id: lifeTrackerId,
        },
    });

    const onSubmit = useHandleError(
        async (values: FormValues) => {
            message.loading({
                type: 'loading',
                content: t('lifeTracker:form.submittingMessage'),
                key: 'editLifeTracker',
                duration: 0,
            });

            const request: CreateLifeTrackerInput = {
                category: values.category as LifeCategory,
                eventName: values.eventName,
                date: values.date,
                priority: values.priority as LifePriority,
                status: values.status as LifeStatus,
            };

            const { data: response } = await updateLifeTracker({
                variables: { lifeTracker: request, id: lifeTrackerId },
            }).finally(() => {
                message.destroy('editLifeTracker');
            });

            if (response.updateLifeTracker.id) {
                message.info({
                    type: 'info',
                    content: t('lifeTracker:edit.message.saveSuccess'),
                    key: 'addLifeTrackerSuccess',
                    duration: 3,
                });

                navigate('/private/system/lifeTrackers');
            }
        },
        [t]
    );

    const initFormValue: FormValues = useMemo(
        () =>
            data?.getLifeTrackerbyId
                ? {
                      category: data.getLifeTrackerbyId.category,
                      date:
                          typeof data.getLifeTrackerbyId.date === 'string'
                              ? dayjs(data.getLifeTrackerbyId.date).toDate()
                              : data.getLifeTrackerbyId.date,
                      eventName: data.getLifeTrackerbyId.eventName,
                      priority: data.getLifeTrackerbyId.priority,
                      status: data.getLifeTrackerbyId.status,
                  }
                : {
                      eventName: '',
                      category: LifeCategory.Education,
                      date: new Date(),
                      priority: LifePriority.Low,
                      status: LifeStatus.Ongoing,
                  },
        [data]
    );

    return (
        <ConsolePageWithHeader title={t('lifeTracker:edit.title')}>
            <Card>
                <LifeTrackerForm key={data?.getLifeTrackerbyId?.id} initValue={initFormValue} onSubmit={onSubmit} />
            </Card>
            <Space direction="vertical" size="middle" style={{ width: '100%' }} />
        </ConsolePageWithHeader>
    );
};

export default memo(EditLifeTrackerPage);
