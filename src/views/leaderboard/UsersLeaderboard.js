import {CDataTable} from '@coreui/react'
import {useStoreState} from "easy-peasy";
import {getBadge} from '../../utils/badgeUtils';

const UsersLeaderboard = () => {
    const {users} = useStoreState(state => state.leaderboard);

    const fields = ['name', 'total_time', 'commits', 'lines_added', 'lines_removed', 'lines_per_second', 'commits_per_hour']

    return <>
        <CDataTable
            items={users}
            fields={fields}
            itemsPerPage={15}
            pagination
            sorter
            scopedSlots={{
                'total_time': (item) => getBadge(item, 'total_time', users),
                'commits': (item) => getBadge(item, 'commits', users),
                'lines_added': (item) => getBadge(item, 'lines_added', users),
                'lines_removed': (item) => getBadge(item, 'lines_removed', users),
                'lines_per_second': (item) => getBadge(item, 'lines_per_second', users),
                'commits_per_hour': (item) => getBadge(item, 'commits_per_hour', users),
            }}>

        </CDataTable>
    </>
}

export default UsersLeaderboard;
