
// ========================================= Group =======================================

export interface IGroup {
    name: String,
    totalTime: number,
    linesAdded: number,
    linesRemoved: number,
    linesPerHour: number,
    commits: number,
    commitsPerHour: number,
    linesPerCommit: number,
}

// ========================================= GroupStats =======================================

export interface IGroupStats {
    users: IGroupUserStats[],
    files: IGroupFileStats[],
}

export interface IGroupUserStats {
    name: string,
    totalTime: number,
    linesAdded: number,
    linesRemoved: number,
    linesPerHour: number,
    commits: number,
    commitsPerHour: number,
    linesPerCommit: number,
}

export interface IGroupFileStats {
    path: string,
    totalTime: number,
    timePerUser: number,
    linesAdded: number,
    linesRemoved: number,
    totalCommits: number,
    commitsPerUser: number,
    commitsPerHour: number,
    users: number,
    linesPerHour: number,
}

export interface IGroupExportDataEntry {
    user: string,
    provider: string,
    repository: string,
    path: string,
    is_app: boolean,
    files_count: number,
    timestamp: number,
    message: string,
    total_time: number,
    lines_added: number,
    lines_removed: number,
}

// ========================================= GroupAccess =======================================

export interface IGroupWithAccess {
    id: number,
    name: string,
    addedAt: string,
    groupAccess: IGroupAccess | null
}

export interface IGroupAccess {
    user: number,
    group: number,
    access_level_recursive: boolean,
}
