import sidebarModel from './sidebarModel';
import timelineModel from './timelineModel';
import groupsModel from './groupsModel';
import intervalsModel from './intervalsModel';
import activityTimelineModel from './activityTimelineModel'

const storeModel = {
    sidebar: sidebarModel,
    timeline: timelineModel,
    activityTimeline: activityTimelineModel,
    groups: groupsModel,
    intervals: intervalsModel,
}

export default storeModel;
