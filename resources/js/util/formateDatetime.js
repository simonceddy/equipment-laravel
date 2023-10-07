import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const formateDatetime = (timestamp) => dayjs(timestamp).fromNow(true);

export default formateDatetime;
