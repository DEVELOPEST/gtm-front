import {CDataTable, CBadge} from '@coreui/react'
import {useStoreState} from "easy-peasy";

const UsersLeaderboard = () => {
    const {users} = useStoreState(state => state.leaderboard);

    const fields = ['name', 'total_time', 'commits', 'lines_added', 'lines_removed', 'lines_per_second']

    const getRankBadge = (value, prop) => {
        const rank = users.filter((u) => u[prop] >= value).length
        if (rank <= 3) {
            const str = rank === 1 ? '1st' : rank === 2 ? '2nd' : '3rd';
            return (
                <CBadge color="primary">
                    {str}
                </CBadge>
            )
        }
        return <></>
    }

    const getBadge = (item, prop) => {
        return (
            <td>
                <span style={{padding: 5}}>
                {item[prop]}
                </span>
                {getRankBadge(item[prop], prop)}
            </td>
        )
    }

    return <>
        <CDataTable
            items={users}
            fields={fields}
            itemsPerPage={15}
            pagination
            scopedSlots={{
                'total_time': (item) => getBadge(item, 'total_time'),
                'commits': (item) => getBadge(item, 'commits'),
                'lines_added': (item) => getBadge(item, 'lines_added'),
                'lines_removed': (item) => getBadge(item, 'lines_removed'),
                'lines_per_second': (item) => getBadge(item, 'lines_per_second'),
            }}>

        </CDataTable>
    </>
}

export default UsersLeaderboard;
