import React from "react";
import {
  CCard,
  CCardBody,
} from '@coreui/react'

import TimelineChart from '../charts/TimelineChart'
import ActivityChart from "../charts/ActivityChart";
import SubDirsChart from "../charts/SubDirsChart";
import {DashboardInputs} from '../../reusable';

const Dashboard = () => {

  return (
    <div data-testid="dashboard">
      <DashboardInputs />
      <CCard data-testid="time-and-users-card">
        <CCardBody>
          <h3>Time and Users</h3>
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
          <h3>Files</h3>
          <SubDirsChart />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default Dashboard
