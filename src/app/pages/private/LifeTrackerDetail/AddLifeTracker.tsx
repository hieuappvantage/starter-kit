import { Card, message, Space } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import {
    CreateLifeTrackerInput,
    LifeCategory,
    LifePriority,
    LifeStatus,
    useAddLifeTrackerMutation,
} from '../../../api';
import ConsolePageWithHeader from '../../../layouts/ConsoleLayout/ConsolePageWithHeader';
import useHandleError from '../../../utilities/useHandleError';
import LifeTrackerForm, { FormValues } from './LifeTrackerForm';

const defaultLifeTracker = {
    eventName: '',
    category: LifeCategory.Education,
    date: new Date(),
    priority: LifePriority.Low,
    status: LifeStatus.Ongoing,
};

const AddLifeTrackerPage = () => {
    const { t } = useTranslation('lifeTracker');
    const navigate = useNavigate();
    const [addLifeTracker] = useAddLifeTrackerMutation();
    const onSubmit = useHandleError(
        async (values: FormValues) => {
            message.loading({
                type: 'loading',
                content: t('lifeTracker:form.submittingMessage'),
                key: 'addLifeTracker',
                duration: 0,
            });

            const request: CreateLifeTrackerInput = {
                category: values.category as LifeCategory,
                eventName: values.eventName,
                date: values.date,
                priority: values.priority as LifePriority,
                status: values.status as LifeStatus,
            };

            const { data } = await addLifeTracker({ variables: { lifeTracker: request } }).finally(() => {
                message.destroy('addLifeTracker');
            });

            if (data.addLifeTracker.id) {
                message.info({
                    type: 'info',
                    content: t('lifeTracker:create.message.saveSuccess'),
                    key: 'addLifeTrackerSuccess',
                    duration: 3,
                });

                navigate('/private/system/lifeTrackers');
            }
        },
        [t]
    );

    return (
        <ConsolePageWithHeader title={t('lifeTracker:create.title')}>
            <Card>
                <LifeTrackerForm initValue={defaultLifeTracker} onSubmit={onSubmit} />
            </Card>
            <Space direction="vertical" size="middle" style={{ width: '100%' }} />
        </ConsolePageWithHeader>
    );
};

export default memo(AddLifeTrackerPage);
