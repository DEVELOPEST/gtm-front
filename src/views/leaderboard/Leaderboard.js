import {CCard, CCardBody, CCardHeader} from '@coreui/react';
import UsersLeaderboard from './UsersLeaderboard';
import React, {useEffect} from 'react';
import {useStoreActions} from 'easy-peasy';
import FilesLeaderboard from './FilesLeaderboard';
import {GroupInputsContainer} from '../../reusable';

const Leaderboard = () => {
    const {fetchGroupStats} = useStoreActions(actions => actions.leaderboard)

    // useEffect(() => {
    //     fetchGroupStats();
    // }, [])

    return <>
        <GroupInputsContainer onInputChanged={() => fetchGroupStats()}/>
        <CCard>
            <CCardHeader>
                <h3>Users</h3>
            </CCardHeader>
            <CCardBody>
                <UsersLeaderboard/>
            </CCardBody>
        </CCard>
        <CCard>
            <CCardHeader>
                <h3>Files</h3>
            </CCardHeader>
            <CCardBody>
                <FilesLeaderboard/>
            </CCardBody>
        </CCard>
    </>
}

export default Leaderboard;
