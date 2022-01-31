import moment from 'moment';

export const getTimeStamp = (): string => {
    return moment().format('DD.MM.YYYY hh:mm:ss');
};

export const getTimeStampUnix = (): number => {
    return +moment();
};

export const parseIntOtherwiseZero = (str: string): number => {
    return isNaN(parseInt(str)) ? 0 : parseInt(str);
}