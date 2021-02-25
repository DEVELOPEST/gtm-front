import {CDataTable} from '@coreui/react'
import {useStoreState} from "easy-peasy";
import {getBadge} from '../../utils/badgeUtils';

const FilesLeaderboard = () => {
    const {files} = useStoreState(state => state.leaderboard);

    const fields = ['path','total_time', 'time_per_user', 'total_commits', 'commits_per_user', 'commits_per_hour', 'users', 'lines_added', 'lines_removed', 'lines_per_hour']

    return <>
        <CDataTable
            items={files}
            fields={fields}
            itemsPerPage={15}
            pagination
            sorter
            sorterValue={{ column: 'total_time', desc: 'true' }}
            scopedSlots={{
                'total_time': (item) => getBadge(item, 'total_time', files),
                'time_per_user': (item) => getBadge(item, 'time_per_user', files),
                'total_commits': (item) => getBadge(item, 'total_commits', files),
                'commits_per_user': (item) => getBadge(item, 'commits_per_user', files),
                'commits_per_hour': (item) => getBadge(item, 'commits_per_hour', files),
                'users': (item) => getBadge(item, 'users', files),
                'lines_added': (item) => getBadge(item, 'lines_added', files),
                'lines_removed': (item) => getBadge(item, 'lines_removed', files),
                'lines_per_hour': (item) => getBadge(item, 'lines_per_hour', files),
            }}>

        </CDataTable>
    </>
}

export default FilesLeaderboard;
