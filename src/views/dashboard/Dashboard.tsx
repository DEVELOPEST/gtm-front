import React from "react";
import {
  CCard,
  CCardBody
} from '@coreui/react'

import TimelineChart from '../charts/TimelineChart'
import ActivityChart from "../charts/ActivityChart";
import SubDirsChart from "../charts/SubDirsChart";
import {DashboardInputs} from '../../reusable';
import TimelineChartSettingsDropdown from "../charts/TimelineChartSettingsDropdown";
import SubDirsChartSettingsDropdown from "../charts/SubDirsChartSettingsDropdown";

const Dashboard = () => {
    return (
    <div data-testid="dashboard">
      <DashboardInputs />
      <CCard data-testid="time-and-users-card">
        <CCardBody>
            <div className="row">
                <div className="col-11">
                    <h3>Time and Users</h3>
                </div>
                <div className="col-1">
                    <TimelineChartSettingsDropdown />
                </div>
            </div>
            <TimelineChart />
        </CCardBody>
      </CCard>
      <CCard data-testid="activity-hours-card">
        <CCardBody>
          <h3>Activity hours</h3>
          <ActivityChart />
        </CCardBody>
      </CCard>
      <CCard data-testid="files-card">
        <CCardBody>
            <div className="row">
                <div className="col-11">
                    <h3>Files</h3>
                </div>
                <div className="col-1">
                    <SubDirsChartSettingsDropdown />
                </div>
            </div>
          <SubDirsChart />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Dashboard
