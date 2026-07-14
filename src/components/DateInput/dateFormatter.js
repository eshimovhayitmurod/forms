import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);
dayjs.extend(quarterOfYear);
export default dayjs;
