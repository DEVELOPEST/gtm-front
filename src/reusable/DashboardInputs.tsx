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

const DashboardInputs = () => {
    const {groups, chosenGroup, loading} = useStoreState(state => state.groups)
    const {fetchGroups, setChosenGroup} = useStoreActions(actions => actions.groups)

    const {startDate, endDate, interval} = useStoreState(state => state.dashboardInputs)
    const {setInterval, setStartDate, setEndDate} = useStoreActions(actions => actions.dashboardInputs)

    const {fetchTimeline} = useStoreActions((actions) => actions.timeline)
    const {fetchSubDirsTimeline} = useStoreActions((actions) => actions.subDirsTimeline)
    const {fetchActivityTimeline} = useStoreActions((actions) => actions.activityTimeline)

    registerLocale('enGB', enGB)

    useEffect(() => {
        if (groups.length === 0) fetchGroups();
    }, [fetchGroups])

    useEffect(() => {
        if ((chosenGroup !== null || groups.length > 0) && interval !== '') {
            fetchTimeline();
            fetchActivityTimeline();
            fetchSubDirsTimeline();
        }
    }, [startDate, chosenGroup, interval, endDate])


    const getIntervalOptions = () => {
        return INTERVALS.map(function (obj) {
            return {label: obj, value: obj}
        })
    }

    const groupOptions = groups.map(function (obj) {
            return {label: obj.name, value: obj.name, object: obj}
        })

    return <>
        <CCard data-testid="dashboard-inputs">
            <CCardBody>
                <CRow className="justify-content-between">
                    <CCol className="col-12 col-sm-12 col-md-3 col-lg-3">
                        <div className="form-group">
                            <label>Group:</label>
                            {
                                loading && groups.length > 0 ? "loading" :
                                    <SelectDropdown
                                        options={groupOptions}
                                        onChange={(value: IGroupOption[] ) => value && value.length > 0 && setChosenGroup(value[0].object)}
                                        searchable={true}
                                        values={groupOptions.filter((option) => (chosenGroup && option.object.id === chosenGroup.id))}
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
                                searchable={false}
                                values={getIntervalOptions().filter(option => option.label === interval)}
                            />
                        </div>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    </>
}

export default DashboardInputs;
