import {CDataTable} from '@coreui/react'
import {useStoreState} from "easy-peasy";
import {getBadge} from '../../utils/badgeUtils';

const FilesLeaderboard = () => {
    const {files} = useStoreState(state => state.leaderboard);

    const fields = ['path','total_time', 'time_per_user', 'commits', 'commits_per_user', 'commits_per_hour', 'users', 'lines_added', 'lines_removed', 'lines_per_second']

    return <>
        <CDataTable
            items={files}
            fields={fields}
            itemsPerPage={15}
            pagination
            sorter
            scopedSlots={{
                'total_time': (item) => getBadge(item, 'total_time', files),
                'time_per_user': (item) => getBadge(item, 'time_per_user', files),
                'commits': (item) => getBadge(item, 'commits', files),
                'commits_per_user': (item) => getBadge(item, 'commits_per_user', files),
                'commits_per_hour': (item) => getBadge(item, 'commits_per_hour', files),
                'users': (item) => getBadge(item, 'users', files),
                'lines_added': (item) => getBadge(item, 'lines_added', files),
                'lines_removed': (item) => getBadge(item, 'lines_removed', files),
                'lines_per_second': (item) => getBadge(item, 'lines_per_second', files),
            }}>

        </CDataTable>
    </>
}

export default FilesLeaderboard;
