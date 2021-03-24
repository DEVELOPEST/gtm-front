import {CDataTable} from '@coreui/react'
import {useStoreState} from "../../store/store";
import {getBadge} from '../../utils/badgeUtils';

const UsersLeaderboard = () => {
    const {users} = useStoreState(state => state.leaderboard);

    const fields = ['name', 'total_time', 'commits', 'lines_added', 'lines_removed', 'lines_per_hour', 'commits_per_hour', 'lines_per_commit']

    return (
        // @ts-ignore TODO: Tavo
        <CDataTable
            items={users}
            fields={fields}
            itemsPerPage={15}
            pagination
            sorter
            sorterValue={{ column: 'total_time', desc: 'true' }}
            scopedSlots={{
                'total_time': (item: any) => getBadge(item, 'total_time', users),
                'commits': (item: any) => getBadge(item, 'commits', users),
                'lines_added': (item: any) => getBadge(item, 'lines_added', users),
                'lines_removed': (item: any) => getBadge(item, 'lines_removed', users),
                'lines_per_hour': (item: any) => getBadge(item, 'lines_per_hour', users),
                'commits_per_hour': (item: any) => getBadge(item, 'commits_per_hour', users),
                'lines_per_commit': (item: any) => getBadge(item, 'lines_per_commit', users),
            }}
            details={{item: "123", index: 0}}
        >

        </CDataTable>
    )
}

export default UsersLeaderboard;
