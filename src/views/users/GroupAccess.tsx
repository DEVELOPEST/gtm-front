import React, {useEffect, useState} from "react"
import {CCard, CCardBody, CCardHeader, CCol, CFormGroup} from "@coreui/react";
import SelectDropdown from "react-dropdown-select";
import {useStoreActions, useStoreState} from "easy-peasy";
import {IGroupWithAccess} from "../../api/models/IGroup";

export interface IOptionsObject {
    label: string
    value: string
}

const GroupAccess = (params: any) => {
    const [showSubDirs, setShowSubDirs] = useState(false)
    const [rightsToGroups, setRightsToGroups] = useState([])
    const {accessibleGroups, notAccessibleGroups} = useStoreState(state => state.groupAccess)
    const {
        // @ts-ignore
        fetchUserAccessibleGroups, fetchUserNotAccessibleGroups, removeRights, addRights, toggleRecursiveRights
    } = useStoreActions(actions => actions.groupAccess)

    useEffect(() => {
        fetchUserAccessibleGroups(params.userId)
        fetchUserNotAccessibleGroups(params.userId)
    }, [])

    const getIntervalOptions = () => {
        if (notAccessibleGroups) {
            return notAccessibleGroups.map(function(obj: IGroupWithAccess) {return {label: obj.name, value: obj.id}})
        }
        return {}
    }

    const handleClickGiveRights = () => {
        addRights(rightsToGroups.map(function(obj: IOptionsObject) {return {user: +params.userId, group: obj.value, access_level_recursive: false}}))
        setRightsToGroups([])
    }

    const rightsToggle = (value: number) => {
        toggleRecursiveRights({user: +params.userId, group: value})
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
                            {accessibleGroups.map((groupWithAccess: IGroupWithAccess) => {
                                return ( groupWithAccess.groupAccess
                                        ? <tr>
                                            <td>{groupWithAccess.name}</td>
                                            <td>{groupWithAccess.groupAccess ? "Access Gives" : "Granted as sub dir"}</td>
                                            <td>
                                                {groupWithAccess.groupAccess &&
                                                <input
                                                onChange={() => rightsToggle(groupWithAccess.id)}
                                                checked={groupWithAccess.groupAccess.accessLevelRecursive} type="checkbox" />
                                                }
                                            </td>
                                            <td>
                                                {groupWithAccess.groupAccess &&
                                                <button
                                                    onClick={() => removeRights([{"group": groupWithAccess.id,"user": +params.userId}])}
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
                                                <td>{groupWithAccess.name}</td>
                                                <td>{groupWithAccess.groupAccess ? "Access Given" : "Recursive"}</td>
                                                <td>
                                                    {groupWithAccess.groupAccess &&
                                                    <input
                                                        onChange={() => rightsToggle(groupWithAccess.id)}
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
