import sidebarModel from './sidebarModel';
import timelineModel from './timelineModel';
import groupsModel from './groupsModel';
import activityTimelineModel from './activityTimelineModel'
import subdirsTimelineModel from './subdirsTimelineModel'
import authModel from './authModel';
import usersModel from './usersModel';
import userModel from './userModel';
import rolesModel from './rolesModel';
import passwordChangeModel from './passwordChangeModel';
import dashboardInputsModel from './dashboardInputsModel';
import groupAccessModel from './groupAccessModel';
import leaderboardModel from './leaderboardModel';

const storeModel = {
    sidebar: sidebarModel,
    timeline: timelineModel,
    activityTimeline: activityTimelineModel,
    subdirsTimeline: subdirsTimelineModel,
    leaderboard: leaderboardModel,
    groups: groupsModel,
    auth: authModel,
    users: usersModel,
    user: userModel,
    roles: rolesModel,
    passwordChange: passwordChangeModel,
    dashboardInputs: dashboardInputsModel,
    groupAccess: groupAccessModel,
}

export default storeModel;
