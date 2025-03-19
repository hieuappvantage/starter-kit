import { DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useField } from 'formik';
import { memo, useCallback } from 'react';
import DatePicker from './DatePicker';
import FormItem, { FormItemProps } from './FormItem';

export interface DatePickerFieldProps extends Omit<DatePickerProps, 'onChange'> {
    name: string;
    label?: string;
    itemProps?: Omit<FormItemProps, 'label' | 'meta' | 'required' | 'children'>;
    required?: boolean;
}

const dateFormat = 'YYYY/MM/DD';

const DatePickerField = ({ name, required, label, itemProps, ...props }: DatePickerFieldProps) => {
    const [field, meta, helpers] = useField({ name });
    const { setValue } = helpers;

    const handleChange = useCallback((date: Dayjs, dateString: string) => {
        setValue(dateString ? dayjs(dateString).toDate() : null);
    }, []);

    return (
        <FormItem {...itemProps} label={label} meta={meta} required={required}>
            <DatePicker defaultValue={dayjs(field.value)} format={dateFormat} onChange={handleChange} />
        </FormItem>
    );
};

export default memo(DatePickerField);
