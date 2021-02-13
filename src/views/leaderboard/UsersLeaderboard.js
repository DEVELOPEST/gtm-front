import {CDataTable} from '@coreui/react'
import {useStoreState} from "easy-peasy";

const UsersLeaderboard = () => {
    const {users} = useStoreState(state => state.leaderboard);

    const fields = ['name','total_time', 'commits', 'lines_added', 'lines_removed', 'lines_per_second']

    return <>
        <CDataTable
            items={users}
            fields={fields}
            itemsPerPage={15}
            pagination>

        </CDataTable>
    </>
}

export default UsersLeaderboard;
