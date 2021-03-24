import {CDataTable} from '@coreui/react'
import {useStoreState} from "../../store/store";
import {getBadge} from '../../utils/badgeUtils';
import {IGroupFileStats} from "../../api/models/IGroup";

const FilesLeaderboard = () => {
    const {files} = useStoreState(state => state.leaderboard);

    const fields = ['path','total_time', 'time_per_user', 'total_commits', 'commits_per_user', 'commits_per_hour', 'users', 'lines_added', 'lines_removed', 'lines_per_hour']

    return (
        // @ts-ignore TODO: Tavo
        <CDataTable
            items={files}
            fields={fields}
            itemsPerPage={15}
            pagination
            sorter
            sorterValue={{ column: 'total_time', desc: 'true' }}
            scopedSlots={{
                'total_time': (item: any) => getBadge(item, 'total_time', files),
                'time_per_user': (item: any) => getBadge(item, 'time_per_user', files),
                'total_commits': (item: any) => getBadge(item, 'total_commits', files),
                'commits_per_user': (item: any) => getBadge(item, 'commits_per_user', files),
                'commits_per_hour': (item: any) => getBadge(item, 'commits_per_hour', files),
                'users': (item: any) => getBadge(item, 'users', files),
                'lines_added': (item: any) => getBadge(item, 'lines_added', files),
                'lines_removed': (item: any) => getBadge(item, 'lines_removed', files),
                'lines_per_hour': (item: any) => getBadge(item, 'lines_per_hour', files),
            }}>

        </CDataTable>
    )
}

export default FilesLeaderboard;
