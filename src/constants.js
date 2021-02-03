import React from "react";

export const isDev = process.env.NODE_ENV === 'development';
export const origin = window && window.location && window.location.origin;

export const baseURL = isDev ? 'http://localhost:8000/services/gtm/' : origin;

export const USER = 'USER';
export const LECTURER = 'LECTURER';
export const ADMIN = 'ADMIN';

export const TALLINN_TIMEZONE = 'Europe/Tallinn';

export const GRAPH_COLORS = [
    "#0066CC",
    "#e07508",
    "#17de17",
    "#cd1d1d",
    "#42A5F5",
    "#e04411",
    "#700f99",
    "#006600",
    "#a1117e",
    "#0000CC"
]
