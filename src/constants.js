import React from "react";

export const isDev = process.env.NODE_ENV === 'development';
export const origin = window && window.location && window.location.origin;

export const baseURL = isDev ? 'https://cs.ttu.ee/services/gtm/' : origin;
