import React from "react";
import {
  CCard,
  CCardBody,
} from '@coreui/react'

import TimelineChart from '../charts/TimelineChart.js'
import ActivityChart from "../charts/ActivityChart";
import SubDirsChart from "../charts/SubDirsChart";
import {GroupInputsContainer} from '../../reusable';
import {useStoreActions, useStoreState} from "easy-peasy";

const Dashboard = () => {

    const {chosenGroup, groups} = useStoreState(state => state.groups)
    const {startDate, endDate, chosenInterval} = useStoreState((state) => state.dashboardInputs)

    const {fetchTimeline} = useStoreActions((actions) => actions.timeline)
    const {fetchSubDirsTimeline} = useStoreActions((actions) => actions.subDirsTimeline)
    const {fetchActivityTimeline} = useStoreActions((actions) => actions.activityTimeline)

    const inputChangedCallback = () => {

        if ((chosenGroup !== null || groups.length > 0) && chosenInterval !== '' && startDate !== '' && endDate !== '') {
            fetchTimeline();
            fetchActivityTimeline();
            fetchSubDirsTimeline();
        }
    }

  return (
    <>
      <GroupInputsContainer onInputChanged={inputChangedCallback}/>
      <CCard>
        <CCardBody>
          <h3>Time and Users</h3>
          <TimelineChart />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <h3>Activity hours</h3>
          <ActivityChart />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <h3>Files</h3>
          <SubDirsChart />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
