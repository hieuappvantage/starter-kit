import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import NoItemResult from '../../../components/results/NoItemResult';
import useGoTo from '../../../utilities/useGoTo';

const LifeTrackerEmptyListResult = () => {
    const { t } = useTranslation('lifeTracker');

    // new life tracker link
    const goToNewPage = useGoTo('/private/system/lifetrackers/new');

    return (
        <NoItemResult
            extra={
                <Button onClick={goToNewPage} type="primary">
                    {t('lifeTracker:list.noData.action')}
                </Button>
            }
            subTitle={t('lifeTracker:list.noData.message')}
        />
    );
};

export default LifeTrackerEmptyListResult;
