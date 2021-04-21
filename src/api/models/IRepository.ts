export interface IRepository {
    id: string,
    fullName: string,
    description: string,
    url: string,
    cloneUrl: string,
    repoCredentials: IRepoCredentials | null,
    lastActivity: Date,
    size: number,
    stars: number,
    tracked: boolean,
    private: boolean,
}

export interface IRepoCredentials {
    provider: string,
    user: string,
    repo: string,
}

export interface ITrackedRepository {
    syncUrl: string,
}
