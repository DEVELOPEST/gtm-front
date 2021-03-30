import sidebar, {SidebarModel} from './sidebarModel';
import timeline, {TimelineModel} from './data/timelineModel';
import groups, {GroupsModel} from './data/groupsModel';
import activityTimeline, {ActivityTimelineModel} from './data/activityTimelineModel'
import subDirsTimeline, {SubDirsTimelineModel} from './data/subDirsTimelineModel'
import auth, {AuthModel} from './authModel';
import users, {UsersModel} from './profile/usersModel';
import user, {UserModel} from './profile/userModel';
import roles, {RolesModel} from './profile/rolesModel';
import passwordChange, {PasswordChangeModel} from './profile/passwordChangeModel';
import dashboardInputs, {DashboardInputsModel} from './inputGroup/dashboardInputsModel';
import groupAccess, {GroupAccessModel} from './profile/groupAccessModel';
import leaderboard, {LeaderboardModel} from './data/leaderboardModel';
import repositories, {RepositoriesModel} from './repositoriesModel';
import exportData, {ExportDataModel} from "./exportDataModel";
import leaderboardInputs, {LeaderboardInputsModel} from "./inputGroup/leaderboardInputsModel";
import timelineComparisonInputs, {TimelineComparisonInputsModel} from "./inputGroup/timelineComparisonInputsModel";
import timelineComparison, {TimelineComparisonModel} from "./data/timelineComparisonModel";

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
    exportData: ExportDataModel,
    leaderboardInputs: LeaderboardInputsModel,
    timelineComparisonInputs: TimelineComparisonInputsModel,
    timelineComparison: TimelineComparisonModel,
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
    exportData,
    leaderboardInputs,
    timelineComparisonInputs,
    timelineComparison
}

export default storeModel;
