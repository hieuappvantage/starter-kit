import { Select, SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import { useField } from 'formik';
import { memo } from 'react';
import FormItem, { FormItemProps } from './FormItem';

export interface SelectFieldProps extends Omit<SelectProps, 'onChange'> {
    name: string;
    label?: string;
    itemProps?: Omit<FormItemProps, 'label' | 'meta' | 'required' | 'children'>;
    required?: boolean;
    options: DefaultOptionType[];
}

const SelectField = ({ name, required, label, itemProps, options, ...props }: SelectFieldProps) => {
    const [field, meta, helpers] = useField({ name });
    const { setValue } = helpers;

    const onselectionchange = (newValue: string | number | null) => {
        setValue(newValue);
    };

    return (
        <FormItem {...itemProps} label={label} meta={meta} required={required}>
            <Select
                // spread props
                {...props}
                // then spread the field properties itself
                {...field}
                onChange={onselectionchange}
                options={options}
                value={field.value}
            />
        </FormItem>
    );
};

export default memo(SelectField);
