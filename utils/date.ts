import { dateSplitRegex } from "../exports/regex";

export const formatDate = (dateString: string): string => {
    if (!dateString) {
        const now = new Date();
        return `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;
    }

    let dateArr = dateString.split(dateSplitRegex);
    // filter out empty strings
    dateArr = dateArr.filter((date) => date !== '');
    if (dateArr.length < 3) dateArr.push(new Date().getFullYear().toString());
    // check if year is first
    if (dateArr[0].length < 3)
        dateArr = dateArr.reverse();
    return dateArr.join('-');
};

export const getDayOfWeek = (date: Date): string => {
    const daysOfWeek = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
    return daysOfWeek[date.getDay()];
};
