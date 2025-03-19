import { Button, Form, Space } from 'antd';
import { Formik, FormikHelpers } from 'formik';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { LifeCategory, LifePriority, LifeStatus } from '../../../api';
import DatePickerField from '../../../components/fields/DatePickerField';
import InputField from '../../../components/fields/InputField';
import SelectField from '../../../components/fields/SelectField';
import useGoTo from '../../../utilities/useGoTo';

export type FormValues = {
    eventName: string;
    category: string;
    date: Date;
    status: string;
    priority: string;
};

type LifeTrackerFormActionsProps = {
    onSubmit: (values: FormValues, helpers: FormikHelpers<FormValues>) => Promise<void>;
    initValue: FormValues;
};

type Errors = {
    eventName?: string;
    date?: string;
};

const LifeCategoryOptions = Object.entries(LifeCategory).map(([key, value]) => ({
    value,
    label: key,
}));

const LifeStatusOptions = Object.entries(LifeStatus).map(([key, value]) => ({
    value,
    label: key,
}));

const LifePriorityOptions = Object.entries(LifePriority).map(([key, value]) => ({
    value,
    label: key,
}));

const MaxWidthDatePickerField = styled.div`
    .ant-picker {
        width: 100%;
    }
`;

const LifeTrackerForm = ({ onSubmit, initValue }: LifeTrackerFormActionsProps) => {
    const { t } = useTranslation('lifeTracker');

    const goToList = useGoTo('/private/system/lifetrackers');

    const submitForm = (values: FormValues, helpers: FormikHelpers<FormValues>) => {
        onSubmit(values, helpers);
    };

    return (
        <Formik<FormValues>
            initialValues={initValue}
            onSubmit={submitForm}
            validate={values => {
                const errors: Errors = {};
                if (!values.eventName) {
                    errors.eventName = t('lifeTracker:form.errors.lifeTrackerRequired');
                }

                if (!values.date) {
                    errors.date = t('lifeTracker:form.errors.dateRequired');
                }

                return errors;
            }}
            enableReinitialize
        >
            {({ isSubmitting, handleSubmit, errors, touched, values }) => (
                <Form layout="vertical" onSubmitCapture={handleSubmit}>
                    <InputField
                        label="Event name"
                        name="eventName"
                        required
                        {...t('lifeTracker:form.fields.eventName', { returnObjects: true })}
                    />
                    <SelectField
                        label="Category"
                        name="category"
                        {...t('lifeTracker:form.fields.category', { returnObjects: true })}
                        options={LifeCategoryOptions}
                    />

                    <SelectField
                        label="Priority"
                        name="priority"
                        {...t('lifeTracker:form.fields.priority', { returnObjects: true })}
                        options={LifePriorityOptions}
                    />

                    <SelectField
                        label="Status"
                        name="status"
                        {...t('lifeTracker:form.fields.status', { returnObjects: true })}
                        options={LifeStatusOptions}
                    />
                    <MaxWidthDatePickerField>
                        <DatePickerField
                            label="Date"
                            name="date"
                            required
                            {...t('lifeTracker:form.fields.date', { returnObjects: true })}
                        />
                    </MaxWidthDatePickerField>
                    <Space size="small">
                        <Button htmlType="submit" loading={isSubmitting} type="primary">
                            {t('lifeTracker:form.actions.save')}
                        </Button>
                        <Button htmlType="button" onClick={goToList} type="ghost">
                            {t('lifeTracker:form.actions.cancel')}
                        </Button>
                    </Space>
                </Form>
            )}
        </Formik>
    );
};

export default memo(LifeTrackerForm);
