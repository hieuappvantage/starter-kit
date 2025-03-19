import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import ConsolePageWithHeader from '../../../layouts/ConsoleLayout/ConsolePageWithHeader';
import useGoTo from '../../../utilities/useGoTo';
import LifeTrackerList from './LifeTrackerList';

const LifeTrackerListPage = () => {
    const { t } = useTranslation('lifeTracker');
    const goToNewLifeTrackerPage = useGoTo('/private/system/lifetrackers/new');

    const extra = (
        <Button icon={<PlusOutlined />} onClick={goToNewLifeTrackerPage} type="primary">
            {t('lifeTracker:list.actions.newLifeTracker')}
        </Button>
    );

    return (
        <ConsolePageWithHeader
            extra={extra}
            subTitle={t('lifeTracker:list.subTitle')}
            title={t('lifeTracker:list.title')}
        >
            <LifeTrackerList />
        </ConsolePageWithHeader>
    );
};

export default LifeTrackerListPage;
