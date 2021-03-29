import {CCard, CCardBody, CCardHeader, CButton} from '@coreui/react';
import UsersLeaderboard from './UsersLeaderboard';
import React, {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from '../../store/store';
import FilesLeaderboard from './FilesLeaderboard';
import {DashboardInputs} from '../../reusable';
import { CSVDownload } from "react-csv";
import LeaderboardInputs from "../../reusable/LeaderboardInputs";

const Leaderboard = () => {
    const {fetchGroupExportData, setData} = useStoreActions((actions) => actions.exportData);
    const {data, dataDownloaded} = useStoreState(state => state.exportData);

    useEffect(() => {
        return () => setData(null);  // cleanup
    });

    return <>
        <LeaderboardInputs />
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
        <CCard>
            <CCardBody>
                <div className="text-right">
                    <CButton color="info" onClick={() => fetchGroupExportData()}>Export Data</CButton>
                    {dataDownloaded ? <CSVDownload data={data!} target="_blank" /> : null }
                </div>
            </CCardBody>
        </CCard>
    </>
}

export default Leaderboard;
