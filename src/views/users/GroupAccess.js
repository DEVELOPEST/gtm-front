import React, {useEffect, useState} from 'react'
import {CCard, CCardBody, CCardHeader, CCol, CFormGroup} from "@coreui/react";
import SelectDropdown from "react-dropdown-select";
import {useStoreActions, useStoreState} from "easy-peasy";

const GroupAccess = params => {
    const [showSubDirs, setShowSubDirs] = useState(false)
    const [rightsToGroups, setRightsToGroups] = useState([])
    const {accessibleGroups, notAccessibleGroups} = useStoreState(state => state.groupAccess)
    const {
        fetchUserAccessibleGroups,
        fetchUserNotAccessibleGroups,
        removeRights,
        addRights,
        toggleRecursiveRights
    } = useStoreActions(actions => actions.groupAccess)

    useEffect(() => {
        fetchUserAccessibleGroups(params.userId)
        fetchUserNotAccessibleGroups(params.userId)
    }, [])

    const getIntervalOptions = () => {
        if (notAccessibleGroups) {
            return notAccessibleGroups.map(function(obj) {return {label: obj.name, value: obj.id}})
        }
        return {}
    }

    const handleClickGiveRights = () => {
        addRights(rightsToGroups.map(function(obj) {return {"user": +params.userId, "group": obj.value, "access_level_recursive": false}}))
        setRightsToGroups([])
    }

    const rightsToggle = value => {
        toggleRecursiveRights({"user": +params.userId, "group": value})
    }

    return (
        <CCol sm={10}>
            <CCard>
                <CCardHeader>
                    User accesses:
                    <input
                        checked={showSubDirs}
                        onChange={() => setShowSubDirs(!showSubDirs)}
                        type="checkbox"
                        className="float-right ml-3 mt-1"
                    />
                    <label className="float-right">Show sub dirs:</label>
                </CCardHeader>
                <CCardBody>
                    <CFormGroup>
                        <label>Groups:</label>
                        <SelectDropdown
                            options={getIntervalOptions()}
                            onChange={value => setRightsToGroups(value)}
                            searchable={true}
                            multi={true}
                            className="mb-4"
                            values={rightsToGroups}
                        />
                        <button
                            onClick={() => handleClickGiveRights()}
                            className="btn btn-primary float-right mb-3">Give rights!</button>
                    </CFormGroup>

                    {accessibleGroups &&
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <td className="mt-2">Group name</td>
                                <td>Access granted</td>
                                <td >Rights to sub dirs:</td>
                                <td ><p className="float-right">Remove rights:</p></td>
                            </tr>
                            </thead>
                            <tbody>
                            {accessibleGroups.map((value) => {
                                return ( value.groupAccess
                                        ? <tr>
                                            <td>{value.name}</td>
                                            <td>{value.groupAccess ? "Access Gives" : "Granted as sub dir"}</td>
                                            <td>
                                                {value.groupAccess &&
                                                <input
                                                onChange={() => rightsToggle(value.id)}
                                                checked={value.groupAccess.accessLevelRecursive} type="checkbox" />
                                                }
                                            </td>
                                            <td>
                                                {value.groupAccess &&
                                                <button
                                                    onClick={() => removeRights([{"group": value.id,"user": +params.userId}])}
                                                    className="btn btn-danger float-right"
                                                >
                                                    Remove
                                                </button>
                                                }
                                            </td>
                                          </tr>
                                        : (
                                            showSubDirs &&
                                            <tr>
                                                <td>{value.name}</td>
                                                <td>{value.groupAccess ? "Access Gives" : "Granted as sub dir"}</td>
                                                <td>
                                                    {value.groupAccess &&
                                                    <input
                                                        checked={value.groupAccess.accessLevelRecursive}
                                                        onChange={() => rightsToggle(value.id)}
                                                        type="checkbox" />
                                                    }
                                                </td>
                                                <td></td>
                                            </tr>
                                        )
                                )
                            })}
                            </tbody>
                        </table>
                    }
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default GroupAccess
