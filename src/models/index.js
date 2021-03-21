import sidebarModel from './sidebarModel';
import timelineModel from './timelineModel';
import groupsModel from './groupsModel';
import activityTimelineModel from './activityTimelineModel'
import subDirsTimelineModel from './subDirsTimelineModel'
import authModel from './authModel';
import usersModel from './usersModel';
import userModel from './userModel';
import rolesModel from './rolesModel';
import passwordChangeModel from './passwordChangeModel';
import dashboardInputsModel from './dashboardInputsModel';
import groupAccessModel from './groupAccessModel';
import leaderboardModel from './leaderboardModel';
import repositoriesModel from './repositoriesModel';

const storeModel = {
    sidebar: sidebarModel,
    timeline: timelineModel,
    activityTimeline: activityTimelineModel,
    subDirsTimeline: subDirsTimelineModel,
    leaderboard: leaderboardModel,
    groups: groupsModel,
    auth: authModel,
    users: usersModel,
    user: userModel,
    roles: rolesModel,
    passwordChange: passwordChangeModel,
    dashboardInputs: dashboardInputsModel,
    groupAccess: groupAccessModel,
    repositories: repositoriesModel,
}

export default storeModel;
