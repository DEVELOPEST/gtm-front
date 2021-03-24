export interface IUser {
    id: number,
    username: String,
    roles: String[],
}

export interface IUserCredentials {
    username: string,
    password: string
}

export interface IJsonWebToken {
    jwt: string
}

export interface IUserGroup {
    user: number
    group: number
    access_level_recursive: boolean | null
}
