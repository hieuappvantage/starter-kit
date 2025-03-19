import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Divider, Popconfirm, Space } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useGoTo from '../../../utilities/useGoTo';

export type LifeTrackerListActionsProps = {
    lifeTrackerId: string;
    deleteLifeTracker: (lifeTrackerId) => void;
};

const Button = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const LifeTrackerListActions = ({ lifeTrackerId, deleteLifeTracker }: LifeTrackerListActionsProps) => {
    const { t } = useTranslation('lifeTracker');
    const goToEdit = useGoTo(`/private/system/lifetrackers/${lifeTrackerId}`);

    return (
        <Space size="small" split={<Divider type="vertical" />}>
            <Button aria-label="Edit" onClick={goToEdit} onKeyDown={goToEdit} type="button">
                <EditOutlined />
            </Button>
            <Popconfirm
                cancelText={t('lifeTracker:delete.actions.cancel')}
                okText={t('lifeTracker:delete.actions.ok')}
                onConfirm={deleteLifeTracker}
                title={t('lifeTracker:delete.messages.deleteConfirmation')}
            >
                <Button aria-label="Delete" type="button">
                    <DeleteOutlined />
                </Button>
            </Popconfirm>
        </Space>
    );
};

export default memo(LifeTrackerListActions);
