import "react-datepicker/dist/react-datepicker.css";

import {CCard, CCardBody, CCol, CRow} from '@coreui/react';
import SelectDropdown from 'react-dropdown-select';
import ReactDatePicker, {registerLocale} from 'react-datepicker';
import {useStoreActions, useStoreState} from "../store/store";
import React, {useEffect} from 'react'
import enGB from 'date-fns/locale/en-GB';
import {IGroupWithAccess} from "../api/models/IGroup";
import {INTERVALS} from "../constants";

interface IGroupOption {
    label: string,
    value: string,
    object: IGroupWithAccess
}


const TimelineComparisonInputs = () => {
    const {groups, loading} = useStoreState(state => state.groups)
    const {fetchGroups} = useStoreActions(actions => actions.groups)

    const {startDate, endDate, interval} = useStoreState(state => state.timelineComparisonInputs)
    const {setInterval, setStartDate, setEndDate} = useStoreActions(actions => actions.timelineComparisonInputs)

    const {settings, chosenGroups} = useStoreState(state => state.timelineComparison)
    const {fetchTimelines, setChosenGroups, setData} = useStoreActions((actions) => actions.timelineComparison)

    registerLocale('enGB', enGB)

    useEffect(() => {
        setChosenGroups([]);
    }, [])

    useEffect(() => {
        if (groups.length === 0) fetchGroups();
    }, [fetchGroups])

    useEffect(() => {
        if ((chosenGroups !== null || groups.length > 0) && interval !== '') {
            setData([])
            fetchTimelines();
        }
    }, [startDate, chosenGroups, interval, endDate, settings.cumulative])


    const getIntervalOptions = () => {
        return INTERVALS.map(function (obj) {
            return {label: obj, value: obj}
        })
    }

    const groupOptions = groups.map(function (obj) {
        return {label: obj.name, value: obj.name, object: obj}
    })

    return <>
        <CCard>
            <CCardBody>
                <CRow className="justify-content-between">
                    <CCol className="col-12 col-sm-12 col-md-3 col-lg-3">
                        <div className="form-group">
                            <label>Group:</label>
                            {
                                loading && groups.length > 0 ? "loading" :
                                    <SelectDropdown
                                        multi={true}
                                        options={groupOptions}
                                        onChange={(value: IGroupOption[] ) => value && value.length > 0 && setChosenGroups(value.map(function (obj) {
                                            return obj.object
                                        }))}
                                        searchable={true}
                                        values={groupOptions.filter((option) => {
                                            chosenGroups.map(function (obj) {
                                                return obj.id
                                            }).includes(option.object.id)
                                        })}
                                    />
                            }
                        </div>
                    </CCol>
                    <CCol className="col-12 col-sm-12 col-md-3 col-lg-3">
                        <div className="form-group">
                            <label>Start date:</label>
                            <ReactDatePicker
                                className="w-100"
                                dateFormat="dd/MM/yyyy"
                                locale="enGB"
                                selected={startDate}
                                onChange={date => date && date instanceof Date && setStartDate(date)}
                            />
                        </div>
                    </CCol>
                    <CCol className="col-12 col-sm-12 col-md-3 col-lg-3">
                        <div className="form-group">
                            <label>End date:</label>
                            <ReactDatePicker
                                className="w-100"
                                dateFormat="dd/MM/yyyy"
                                locale="enGB"
                                selected={endDate}
                                onChange={date => date && date instanceof Date && setEndDate(date)}
                            />
                        </div>
                    </CCol>
                    <CCol className="col-12 col-sm-12 col-md-3 col-lg-3">
                        <div className="form-group">
                            <label>Interval:</label>
                            <SelectDropdown
                                options={getIntervalOptions()}
                                onChange={value => setInterval(value[0].value)}
                                values={getIntervalOptions().filter(option => option.label === interval)}
                            />
                        </div>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    </>
}

export default TimelineComparisonInputs;
