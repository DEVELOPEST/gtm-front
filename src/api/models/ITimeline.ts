
// ========================================= Timeline =======================================
export interface ITimeline {
    start: string,
    end: string,
    time: number,
    users: number,
}

// ========================================= SubDirLevelTimeline =======================================
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

// ========================================= ActivityTimeline =======================================
export interface IActivityTimeline {
    label: string,
    labelKey: number,
    time: number,
    linesAdded: number,
    linesRemoved: number,
    users: number,
}
