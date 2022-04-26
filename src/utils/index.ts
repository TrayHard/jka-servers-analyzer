export const parseIntOtherwiseZero = (str: string): number => {
    return isNaN(parseInt(str)) ? 0 : parseInt(str);
}