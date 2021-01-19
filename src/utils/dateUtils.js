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

export const formatDate = (date, interval) => {
    return {
        "Day": format(date, "HH"),
        "Week": format(date, "EEEEEE"),
        "Month": format(date, "dd.MM"),
        "Year": format(date, "MMMM"),
    }[interval]
}

export const getEndDate = (date, interval) => {
    return {
        "Day": endOfDay(date),
        "Week": endOfWeek(date),
        "Month": endOfMonth(date),
        "Year": endOfYear(date),
    }[interval]
}

export const getStartDate = (date, interval) => {
    return {
        "Day": startOfDay(date),
        "Week": startOfWeek(date),
        "Month": startOfMonth(date),
        "Year": startOfYear(date),
    }[interval]
}

export const getRequestInterval = (interval) => {
    return {
        "Day": 'HOUR',
        "Week": 'DAY',
        "Month": 'DAY',
        "Year": 'MONTH',
    }[interval]
}