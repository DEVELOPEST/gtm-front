
// ========================================= Timeline =======================================
export interface ITimeline {
    start: string,
    end: string,
    time: number,
    users: number,
}

// =========================== SubDirLevelTimeline =============================
export interface ISubDirLevelTimelineWrapper {
    paths: string[],
    data: ISubDirLevelTimelineData[],
}

export interface ISubDirLevelTimelineData {
    start: string,
    end: string,
    directories: IDictionary<ISubDirLevelTimelineEntry>,
}

export interface ISubDirLevelTimelineEntry {
    path: string,
    time: number,
    commits: number,
    linesAdded: number,
    linesRemoved: number,
    users: number,
}

export interface IDictionary<TValue> {
    [id: string]: TValue;
}

// ============================= ActivityTimeline ==============================
export interface IActivityTimeline {
    label: string,
    labelKey: number,
    time: number,
    linesAdded: number,
    linesRemoved: number,
    users: number,
}

// ============================== Comparison ===================================

export interface ITimelineComparison {
    branches: string[],
    users: string[],
    repos: string[],
    time: IComparisonStat,
    commits: IComparisonStat,
    linesAdded: IComparisonStat,
    linesRemoved: IComparisonStat,
    timeline: ITimelineComparisonEntry[],
    filteredTimeline: ITimelineComparisonEntry[],

}

export interface IComparisonStat {
    total: number,
    highlighted: number,
    rank: number,
    data: IComparisonStatEntry[],
}

export interface ITimelineComparisonEntry {
    start: Date,
    end: Date,
    time: number,
    commits: number,
    linesAdded: number,
    linesRemoved: number,
    users: number,
}

export interface IComparisonStatEntry {
    rank: number,
    value: number,
}
