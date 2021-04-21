import {CDataTable} from '@coreui/react'
import {useStoreState} from "../../store/store";
import {getBadge} from '../../utils/badgeUtils';
import {IGroupFileStats} from "../../api/models/IGroup";

const FilesLeaderboard = ()  => {
    const {files} = useStoreState(state => state.leaderboard);

    const fields = ['path','totalTime', 'timePerUser', 'totalCommits', 'commitsPerUser', 'commitsPerHour', 'users', 'linesAdded', 'linesRemoved', 'linesPerHour']

    return (
        // @ts-ignore
        <CDataTable
            items={files}
            fields={fields}
            itemsPerPage={15}
            pagination
            sorter
            data-testid="files-leaderboard"
            sorterValue={{ column: 'totalTime', desc: 'true' }}
            scopedSlots={{
                'totalTime': (item: any) => getBadge(item, 'totalTime', files),
                'timePerPser': (item: any) => getBadge(item, 'timePerUser', files),
                'totalCommits': (item: any) => getBadge(item, 'totalCommits', files),
                'commitsPerUser': (item: any) => getBadge(item, 'commitsPerUser', files),
                'commitsPerHour': (item: any) => getBadge(item, 'commitsPerHour', files),
                'users': (item: any) => getBadge(item, 'users', files),
                'linesAdded': (item: any) => getBadge(item, 'linesAdded', files),
                'linesRemoved': (item: any) => getBadge(item, 'linesRemoved', files),
                'linesPerHour': (item: any) => getBadge(item, 'linesPerHour', files),
            }}>

        </CDataTable>
    )
}

export default FilesLeaderboard;
