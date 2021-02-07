import sidebarModel from './sidebarModel';
import timelineModel from './timelineModel';
import groupsModel from './groupsModel';
import intervalsModel from './intervalsModel';
import authModel from './authModel';
import usersModel from './usersModel';
import userModel from './userModel';
import rolesModel from './rolesModel';
import passwordChangeModel from './passwordChangeModel';

const storeModel = {
    sidebar: sidebarModel,
    timeline: timelineModel,
    groups: groupsModel,
    intervals: intervalsModel,
    auth: authModel,
    users: usersModel,
    user: userModel,
    roles: rolesModel,
    passwordChange: passwordChangeModel,
}

export default storeModel;
