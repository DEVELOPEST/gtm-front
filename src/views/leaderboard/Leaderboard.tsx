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

    return <div data-testid="leaderboard">
        <LeaderboardInputs />
        <CCard data-testid="users-card">
            <CCardHeader>
                <h3>Users</h3>
            </CCardHeader>
            <CCardBody>
                <UsersLeaderboard/>
            </CCardBody>
        </CCard>
        <CCard data-testid="files-card">
            <CCardHeader>
                <h3>Files</h3>
            </CCardHeader>
            <CCardBody>
                <FilesLeaderboard/>
            </CCardBody>
        </CCard>
        <CCard data-testid="export-data-card">
            <CCardBody>
                <div className="text-right">
                    <CButton color="info" onClick={() => fetchGroupExportData()} data-testid="export-data-button">Export Data</CButton>
                    {dataDownloaded ? <CSVDownload data={data!} target="_blank" /> : null }
                </div>
            </CCardBody>
        </CCard>
    </div>
}

export default Leaderboard;
