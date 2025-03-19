import generatePicker from 'antd/es/date-picker/generatePicker';
import { Dayjs } from 'dayjs';
import generateConfig from 'rc-picker/lib/generate/dayjs';

const DatePicker = generatePicker<Dayjs>(generateConfig);

export default DatePicker;
