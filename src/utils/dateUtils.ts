import format from 'date-fns/format';
import {
    endOfDay,
    endOfWeek,
    endOfMonth,
    endOfYear,
    startOfDay,
    startOfWeek,
    startOfMonth,
    startOfYear
} from 'date-fns';

export const formatDate = (date: Date, interval: string) => {
    return {
        "Day": format(date, "HH"),
        "Week": format(date, "EEEEEE"),
        "Month": format(date, "dd.MM"),
        "Year": format(date, "MMMM"),
    }[interval]
}

export const getEndDate = (date: Date, interval: string) => {
    return {
        "Day": endOfDay(date),
        "Week": endOfWeek(date),
        "Month": endOfMonth(date),
        "Year": endOfYear(date),
    }[interval]
}

export const getStartDate = (date: Date, interval: string) => {
    return {
        "Day": startOfDay(date),
        "Week": startOfWeek(date),
        "Month": startOfMonth(date),
        "Year": startOfYear(date),
    }[interval]
}

export const getRequestInterval = (interval: string) => {
    return {
        "Day": 'HOUR',
        "Week": 'DAY',
        "Month": 'DAY',
        "Year": 'MONTH',
    }[interval]
}

export const dateFormatter = (date: any | Date) => {
    if (typeof date !== 'string' || date.indexOf('T') === -1) return date;
    return date?.split('T')[0];
};

