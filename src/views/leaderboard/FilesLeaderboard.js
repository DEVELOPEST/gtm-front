import {CDataTable} from '@coreui/react'
import {useStoreState} from "easy-peasy";

const FilesLeaderboard = () => {
    const {files} = useStoreState(state => state.leaderboard);

    const fields = ['path','total_time', 'time_per_user', 'commits', 'commits_per_user', 'users', 'lines_added', 'lines_removed', 'lines_per_second']

    return <>
        <CDataTable
            items={files}
            fields={fields}
            itemsPerPage={15}
            pagination>

        </CDataTable>
    </>
}

export default FilesLeaderboard;
