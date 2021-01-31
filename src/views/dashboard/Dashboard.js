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

import MainChart from '../charts/MainChart.js'
import ExampleChart from '../charts/ExampleChart.js'
import {useStoreActions, useStoreState} from "easy-peasy";

const Dashboard = () => {
  const {groups, chosenGroup, loading} = useStoreState(state => state.groups)
  const {fetchGroups, setChosenGroup} = useStoreActions(actions => actions.groups)

  const {intervals, chosenInterval} = useStoreState(state => state.intervals)
  const {setChosenInterval} = useStoreActions(actions => actions.intervals)

  const {startDate} = useStoreState(state => state.timeline)
  const {fetchTimeline, setStartDate} = useStoreActions(actions => actions.timeline)

  useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  useEffect(() => {
    if (groups.length !== 0 && chosenInterval !== '' && startDate !== '') {
      fetchTimeline(chosenInterval)
    }
  }, [groups])

  useEffect(() => {
    if (groups.length !== 0 && chosenInterval !== '' && startDate !== '') {
      fetchTimeline(chosenInterval)
    }
  }, [chosenInterval])

  useEffect(() => {
    if (groups.length !== 0 && chosenInterval !== '' && startDate !== '') {
      fetchTimeline(chosenInterval)
    }
  }, [startDate])

  const getIntervalOptions = () => {
    return intervals.map(function(obj) {return {label: obj, value: obj}})
  }

  const getGroupOptions = () => {
    return groups.map(function(obj) {return {label: obj.name, value: obj.id}})
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
                    onChange={value => setChosenGroup(value)}
                    searchable={false}
                    values={getGroupOptions().filter(option => option.label === chosenGroup.name)}
                    />
                }
              </div>
            </CCol>
            <CCol className="col-12 col-sm-12 col-md-4 col-lg-3">
              <div className="form-group">
                <label>Date:</label>
                <ReactDatePicker
                    className="w-100"
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                />
              </div>
            </CCol>
            <CCol className="col-12 col-sm-12 col-md-3 col-lg-3">
              <div className="form-group">
                <label>Period:</label>
                <SelectDropdown
                    options={getIntervalOptions()}
                    onChange={value => setChosenInterval(value[0].value)}
                    searchable={false}
                    values={getIntervalOptions().filter(option => option.label === chosenInterval)}
                />
              </div>
            </CCol>
          </CRow>
          <MainChart style={{height: '300px', marginTop: '40px'}}/>
          <ExampleChart />
        </CCardBody>
      </CCard>


    </>
  )
}

export default Dashboard
