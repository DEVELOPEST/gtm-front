import "react-datepicker/dist/react-datepicker.css";

import {CCard, CCardBody, CCol, CRow} from '@coreui/react';
import SelectDropdown from 'react-dropdown-select';
import ReactDatePicker, {registerLocale} from 'react-datepicker';
import {useStoreActions, useStoreState} from "../store/store";
import React, {useEffect} from 'react'
import enGB from 'date-fns/locale/en-GB';
import {IGroupWithAccess} from "../api/models/IGroup";

interface IGroupOption {
    label: string,
    value: IGroupWithAccess,
    name: string
}

interface IIntervalOption {
    label: string,
    value: string,
}

const GroupInputsContainer = (onInputChanged: { onInputChanged: Function }) => {
    const {groups, chosenGroup, loading} = useStoreState(state => state.groups)
    const {fetchGroups, setChosenGroup} = useStoreActions(actions => actions.groups)

    const {startDate, endDate, intervals, chosenInterval} = useStoreState(state => state.dashboardInputs)
    const {setChosenInterval, setStartDate, setEndDate} = useStoreActions(actions => actions.dashboardInputs)

    registerLocale('enGB', enGB)

    useEffect(() => {
        onInputChanged.onInputChanged();
    }, [chosenGroup])

    useEffect(() => {
        onInputChanged.onInputChanged();
    }, [chosenInterval])

    useEffect(() => {
        onInputChanged.onInputChanged();
    }, [startDate])

    useEffect(() => {
        onInputChanged.onInputChanged();
    }, [endDate])

    useEffect(() => {
        fetchGroups()
    }, [fetchGroups])

    const getIntervalOptions = () => {
        return intervals.map(function (obj) {
            return {label: obj, value: obj}
        })
    }

    const getGroupOptions = () => {
        return groups.map(function (obj) {
            return {label: obj.name, value: obj, name: obj.name}
        })
    }

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
                                        options={getGroupOptions()}
                                        onChange={(value: IGroupOption[] ) => value && value.length > 0 && setChosenGroup(value[0].value)}
                                        searchable={false}
                                        values={getGroupOptions().filter((option) => (chosenGroup && option.name === chosenGroup.name))}
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
                                onChange={value => setChosenInterval(value[0].value)}
                                searchable={false}
                                values={getIntervalOptions().filter(option => option.label === chosenInterval)}
                            />
                        </div>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    </>
}

export default GroupInputsContainer;
