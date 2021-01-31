import sidebarModel from './sidebarModel';
import timelineModel from './timelineModel';
import groupsModel from './groupsModel';
import intervalsModel from './intervalsModel';
import authModel from './authModel';
import usersModel from './usersModel';
import rolesModel from './rolesModel';

const storeModel = {
    sidebar: sidebarModel,
    timeline: timelineModel,
    groups: groupsModel,
    intervals: intervalsModel,
    auth: authModel,
    users: usersModel,
    roles: rolesModel,
}

export default storeModel;
