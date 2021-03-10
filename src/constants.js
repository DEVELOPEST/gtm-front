import React from "react";

export const IS_DEV = process.env.NODE_ENV === 'development';
export const ORIGIN = 'https://cs.ttu.ee/services/gtm/'  // window && window.location && window.location.origin;

export const BASE_URL = IS_DEV ? 'http://localhost:8000/services/gtm/' : ORIGIN;

export const GITHUB_OAUTH_URL = BASE_URL + 'api/oauth/login/github';
export const GITLAB_OAUTH_URL = BASE_URL + 'api/oauth/login/gitlab';
export const MICROSOFT_OAUTH_URL = BASE_URL + 'api/oauth/login/microsoft';

export const GITHUB_OAUTH_LINK_URL = BASE_URL + 'api/oauth/login/github';
export const GITLAB_OAUTH_LINK_URL = BASE_URL + 'api/oauth/login/gitlab';
export const MICROSOFT_OAUTH_LINK_URL = BASE_URL + 'api/oauth/login/microsoft';

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
