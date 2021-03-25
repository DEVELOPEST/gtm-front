import {CDataTable} from '@coreui/react'
import {useStoreState} from "../../store/store";
import {getBadge} from '../../utils/badgeUtils';

const UsersLeaderboard = () => {
    const {users} = useStoreState(state => state.leaderboard);

    const fields = ['name', 'totalTime', 'commits', 'linesAdded', 'linesRemoved', 'linesPerHour', 'commitsPerHour', 'linesPerCommit']

    return (
        <CDataTable
            items={users}
            fields={fields}
            itemsPerPage={15}
            pagination
            sorter
            sorterValue={{ column: 'totalTime', desc: 'true' }}
            scopedSlots={{
                'totalTime': (item: any) => getBadge(item, 'totalTime', users),
                'commits': (item: any) => getBadge(item, 'commits', users),
                'linesAdded': (item: any) => getBadge(item, 'linesAdded', users),
                'linesRemoved': (item: any) => getBadge(item, 'linesRemoved', users),
                'linesPerHour': (item: any) => getBadge(item, 'linesPerHour', users),
                'commitsPerHour': (item: any) => getBadge(item, 'commitsPerHour', users),
                'linesPerCommit': (item: any) => getBadge(item, 'linesPerCommit', users),
            }}
        />
    )
}

export default UsersLeaderboard;
