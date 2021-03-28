import sidebar, {SidebarModel} from './sidebarModel';
import timeline, {TimelineModel} from './timelineModel';
import groups, {GroupsModel} from './groupsModel';
import activityTimeline, {ActivityTimelineModel} from './activityTimelineModel'
import subDirsTimeline, {SubDirsTimelineModel} from './subDirsTimelineModel'
import auth, {AuthModel} from './authModel';
import users, {UsersModel} from './usersModel';
import user, {UserModel} from './userModel';
import roles, {RolesModel} from './rolesModel';
import passwordChange, {PasswordChangeModel} from './passwordChangeModel';
import dashboardInputs, {DashboardInputsModel} from './dashboardInputsModel';
import groupAccess, {GroupAccessModel} from './groupAccessModel';
import leaderboard, {LeaderboardModel} from './leaderboardModel';
import repositories, {RepositoriesModel} from './repositoriesModel';
import exportModel, {ExportModel} from "./exportModel";

export interface StoreModel {
    sidebar: SidebarModel,
    timeline: TimelineModel,
    activityTimeline: ActivityTimelineModel,
    subDirsTimeline: SubDirsTimelineModel,
    leaderboard: LeaderboardModel,
    groups: GroupsModel,
    auth: AuthModel,
    users: UsersModel,
    user: UserModel,
    roles: RolesModel,
    passwordChange: PasswordChangeModel,
    dashboardInputs: DashboardInputsModel,
    groupAccess: GroupAccessModel,
    repositories: RepositoriesModel,
    exportModel: ExportModel,
}

const storeModel: StoreModel = {
    sidebar,
    timeline,
    activityTimeline,
    subDirsTimeline,
    leaderboard,
    groups,
    auth,
    users,
    user,
    roles,
    passwordChange,
    dashboardInputs,
    groupAccess,
    repositories,
    exportModel,
}

export default storeModel;
