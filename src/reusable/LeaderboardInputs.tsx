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
    value: string,
    object: IGroupWithAccess
}

const LeaderboardInputs = () => {
    const {fetchGroupStats} = useStoreActions((actions) => actions.leaderboard);

    const {groups, chosenGroup, loading} = useStoreState(state => state.groups)
    const {fetchGroups, setChosenGroup} = useStoreActions(actions => actions.groups)

    const {startDate, endDate, depth} = useStoreState(state => state.leaderboardInputs)
    const {setDepth, setStartDate, setEndDate} = useStoreActions(actions => actions.leaderboardInputs)

    registerLocale('enGB', enGB)

    useEffect(() => {
        if (groups.length === 0) fetchGroups();
    }, [fetchGroups])

    useEffect(() => {
        console.log("hereee")
        fetchGroupStats();
    }, [chosenGroup, depth, startDate, endDate])


    const groupOptions = groups.map(function (obj) {
        return {label: obj.name, value: obj.name, object: obj}
    })

    // TODO backist voiks midagi kysida akki?
    const depthOptions = () => {
        return [
            {label: 1, value: 1},
            {label: 2, value: 2},
            {label: 3, value: 3},
            {label: 4, value: 4},
            {label: 5, value: 5},
            {label: 6, value: 6},
        ]
    }

    return <>
        <CCard data-testid="leaderboard-inputs">
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
                                        searchable={false}
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
                            <label>Depth:</label>
                            <SelectDropdown
                                options={depthOptions()}
                                onChange={value => setDepth(value[0].value)}
                                searchable={false}
                                values={depthOptions().filter(option => option.label === depth)}
                            />
                        </div>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    </>
}

export default LeaderboardInputs;
