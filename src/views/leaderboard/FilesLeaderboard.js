import {CBadge, CDataTable} from '@coreui/react'
import {useStoreState} from "easy-peasy";

const FilesLeaderboard = () => {
    const {files} = useStoreState(state => state.leaderboard);

    const fields = ['path','total_time', 'time_per_user', 'commits', 'commits_per_user', 'users', 'lines_added', 'lines_removed', 'lines_per_second']

    const getRankBadge = (value, prop) => {
        const rank = files.filter((u) => u[prop] >= value).length
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
            items={files}
            fields={fields}
            itemsPerPage={15}
            pagination
            scopedSlots={{
                'total_time': (item) => getBadge(item, 'total_time'),
                'time_per_user': (item) => getBadge(item, 'time_per_user'),
                'commits': (item) => getBadge(item, 'commits'),
                'commits_per_user': (item) => getBadge(item, 'commits_per_user'),
                'users': (item) => getBadge(item, 'users'),
                'lines_added': (item) => getBadge(item, 'lines_added'),
                'lines_removed': (item) => getBadge(item, 'lines_removed'),
                'lines_per_second': (item) => getBadge(item, 'lines_per_second'),
            }}>

        </CDataTable>
    </>
}

export default FilesLeaderboard;
