import sidebarModel from './sidebarModel';
import timelineModel from './timelineModel';
import groupsModel from './groupsModel';
import activityTimelineModel from './activityTimelineModel'
import subdirsTimelineModel from './subdirsTimelineModel'
import authModel from './authModel';
import usersModel from './usersModel';
import rolesModel from './rolesModel';
import dashboardInputsModel from './dashboardInputsModel';

const storeModel = {
    sidebar: sidebarModel,
    timeline: timelineModel,
    activityTimeline: activityTimelineModel,
    subdirsTimeline: subdirsTimelineModel,
    groups: groupsModel,
    auth: authModel,
    users: usersModel,
    roles: rolesModel,
    dashboardInputs: dashboardInputsModel,
}

export default storeModel;
