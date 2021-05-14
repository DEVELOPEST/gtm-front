
export const IS_DEV = false // process.env.NODE_ENV === 'development';
export const ORIGIN = 'https://cs.ttu.ee/services/gtm/'  // window && window.location && window.location.origin;

export const BASE_URL = IS_DEV ? 'http://localhost:8000/services/gtm/' : ORIGIN;

export const GITHUB_OAUTH_URL = BASE_URL + 'api/oauth/login/github';
export const GITLAB_OAUTH_URL = BASE_URL + 'api/oauth/login/gitlab';
export const MICROSOFT_OAUTH_URL = BASE_URL + 'api/oauth/login/microsoft';
export const TALTECH_OAUTH_URL = BASE_URL + 'api/oauth/login/gitlab-taltech';
export const BITBUCKET_OAUTH_URL = BASE_URL + 'api/oauth/login/bitbucket';

export const GITHUB_OAUTH_TYPE_STRING = 'oauth_token_github';
export const GITLAB_OAUTH_TYPE_STRING = 'oauth_bearer_gitlab';
export const MICROSOFT_OAUTH_TYPE_STRING = 'oauth_bearer_microsoft';
export const TALTECH_OAUTH_TYPE_STRING = 'oauth_bearer_gitlab.cs.ttu.ee';
export const BITBUCKET_OAUTH_TYPE_STRING = 'oauth_bearer_bitbucket';

export const USER = 'USER';
export const LECTURER = 'LECTURER';
export const ADMIN = 'ADMIN';

export const TALLINN_TIMEZONE = 'Europe/Tallinn';
export const INTERVALS = ["Day", "Week", "Month"];

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

export const TEST_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTg0MTM4NTcsImV4cCI6MTYxODUwMDI1NzQsInVzZXIiOjIyLCJ1c2VybmFtZSI6Ik1hcnRlbkp1cmciLCJyb2xlcyI6WyJVU0VSIl19.4cb7Hngv6an3tjCH7uU9A3RDG2Y_8kQyWqNES1qpMsc'

export const ACTIVITY_TIMELINE_MOCK_DATA = [
    {
        "label": "0",
        "labelKey": 0,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "1",
        "labelKey": 1,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "2",
        "labelKey": 2,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "3",
        "labelKey": 3,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "4",
        "labelKey": 4,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "5",
        "labelKey": 5,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "6",
        "labelKey": 6,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "7",
        "labelKey": 7,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "8",
        "labelKey": 8,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "9",
        "labelKey": 9,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "10",
        "labelKey": 10,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "11",
        "labelKey": 11,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "12",
        "labelKey": 12,
        "time": 0.1,
        "linesAdded": 35,
        "linesRemoved": 675,
        "users": 1
    },
    {
        "label": "13",
        "labelKey": 13,
        "time": 0.1,
        "linesAdded": 2,
        "linesRemoved": 2,
        "users": 1
    },
    {
        "label": "14",
        "labelKey": 14,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "15",
        "labelKey": 15,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "16",
        "labelKey": 16,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "17",
        "labelKey": 17,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "18",
        "labelKey": 18,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "19",
        "labelKey": 19,
        "time": 0.1,
        "linesAdded": 1,
        "linesRemoved": 1,
        "users": 1
    },
    {
        "label": "20",
        "labelKey": 20,
        "time": 0.2,
        "linesAdded": 14,
        "linesRemoved": 1,
        "users": 1
    },
    {
        "label": "21",
        "labelKey": 21,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "22",
        "labelKey": 22,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    },
    {
        "label": "23",
        "labelKey": 23,
        "time": 0,
        "linesAdded": 0,
        "linesRemoved": 0,
        "users": 0
    }
]
