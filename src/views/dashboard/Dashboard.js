import React, {lazy, useEffect, useState} from 'react'
import SelectDropdown from 'react-dropdown-select';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'

import TimelineChart from '../charts/TimelineChart.js'
import {useStoreActions, useStoreState} from "easy-peasy";
import ActivityChart from "../charts/ActivityChart";
import SubdirsChart from "../charts/SubdirsChart";

const Dashboard = () => {
  const {groups, chosenGroup, loading} = useStoreState(state => state.groups)
  const {fetchGroups, setChosenGroup} = useStoreActions(actions => actions.groups)

  const {startDate, endDate, intervals, chosenInterval} = useStoreState(state => state.dashboardInputs)
  const {setChosenInterval, setStartDate, setEndDate} = useStoreActions(actions => actions.dashboardInputs)

  const {fetchTimeline} = useStoreActions(actions => actions.timeline)
  const {fetchSubdirsTimeline} = useStoreActions(actions => actions.subdirsTimeline)
  const {fetchActivityTimeline} = useStoreActions(actions => actions.activityTimeline)

  useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  useEffect(() => {

    if (chosenGroup !== '' && chosenInterval !== '' && startDate !== '') {
      fetchTimeline();
      fetchActivityTimeline();
      fetchSubdirsTimeline();
    }
  }, [chosenGroup])

  useEffect(() => {
    if (groups.length !== 0 && chosenInterval !== '' && startDate !== '') {
      fetchTimeline();
      fetchActivityTimeline();
      fetchSubdirsTimeline();
    }
  }, [chosenInterval])

  useEffect(() => {
    if (groups.length !== 0 && chosenInterval !== '' && startDate !== '') {
      fetchTimeline();
      fetchActivityTimeline();
      fetchSubdirsTimeline();
    }
  }, [startDate])

  const getIntervalOptions = () => {
    return intervals.map(function(obj) {return {label: obj, value: obj}})
  }

  const getGroupOptions = () => {
    return groups.map(function(obj) {return {label: obj.name, value: obj.id, name: obj.name}})
  }

  return (
    <>
      <CCard>
        <CCardBody>
          <CRow className="justify-content-between">
            <CCol className="col-12 col-sm-12 col-md-3 col-lg-3">
              <div className="form-group">
                <label>Group:</label>
                {
                  loading && groups.length > 0 ? "loading" :
                    <SelectDropdown
                    options={getGroupOptions()}
                    onChange={value => setChosenGroup(value[0])}
                    searchable={false}
                    values={getGroupOptions().filter(option => option.label === chosenGroup.name)}
                    />
                }
              </div>
            </CCol>
            <CCol className="col-12 col-sm-12 col-md-3 col-lg-3">
              <div className="form-group">
                <label>Start date:</label>
                <ReactDatePicker
                    className="w-100"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                />
              </div>
            </CCol>
            <CCol className="col-12 col-sm-12 col-md-3 col-lg-3">
              <div className="form-group">
                <label>End date:</label>
                <ReactDatePicker
                    className="w-100"
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                />
              </div>
            </CCol>
            <CCol className="col-12 col-sm-12 col-md-3 col-lg-3">
              <div className="form-group">
                <label>Interval:</label>
                <SelectDropdown
                    options={getIntervalOptions()}
                    onChange={value => setChosenInterval(value[0].value)}
                    searchable={false}
                    values={getIntervalOptions().filter(option => option.label === chosenInterval)}
                />
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <h3>Time Chart</h3>
          <TimelineChart />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <h3>Activity Chart</h3>
          <ActivityChart />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <h3>Subdirs Chart</h3>
          <SubdirsChart />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
