import React from "react";

export const isDev = process.env.NODE_ENV === 'development';
export const origin = 'https://cs.ttu.ee/services/gtm/'  // window && window.location && window.location.origin;

export const baseURL = isDev ? 'https://cs.ttu.ee/services/gtm/' : origin;

export const USER = 'USER';
export const LECTURER = 'LECTURER';
export const ADMIN = 'ADMIN';

export const TALLINN_TIMEZONE = 'Europe/Tallinn';

export const GRAPH_COLORS = [
    "#0066cc",
    "#ce6a00",
    "#00d700",
    "#ff0000",
    "#42A5F5",
    "#e04411",
    "#61008d",
    "#006600",
    "#c68402",
    "#a5007b",
    "#0000CC",
    "#ec006b",
    "#003200",
    "#49001e",
    "#000023",
    "#5f1800",
]
