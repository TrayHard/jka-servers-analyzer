import { format, getUnixTime } from 'date-fns';

export const getTimeStamp = (): string => {
    return format(new Date(), 'dd.MM.yyyy hh:mm:ss');
};

export const getTimeStampUnix = (): number => {
    return getUnixTime(new Date());
};