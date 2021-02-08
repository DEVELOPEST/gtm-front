import React, {useEffect} from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import {useStoreActions, useStoreState} from "easy-peasy";
import CustomLoader from "../../reusable/CustomLoader";
import GroupAccess from "./GroupAccess";


const User = ({match}) => {
    const {
        user,
        loading: userLoading,
        error} = useStoreState(state => state.user)
    const {fetchUser} = useStoreActions(actions => actions.user)
    const {addRole, removeRole} = useStoreActions(actions => actions.roles)

    useEffect(() => {
        fetchUser(match.params.id);
    }, [])

    const handleClickAdd = async id => {
        await addRole(id)
        window.location.reload()
    }

    const handleClickRemove = async id => {
        await removeRole(id)
        window.location.reload()
    }

    return (
        <CRow className='justify-content-center'>
        {userLoading
            ? <CustomLoader />
            : (
                <CCol sm={10}>
                    <CCard>
                        <CCardHeader>
                            User id: {match.params.id}
                        </CCardHeader>
                        <CCardBody>
                            <table className="table table-striped table-hover">
                                {user &&
                                    <tbody>
                                        <tr>
                                            <td>email:</td>
                                            <td><strong>{user.email}</strong></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Roles:</td>
                                            <td><strong>{user.roles && user.roles.join(", ")}</strong></td>
                                            <td>
                                                {user.roles && user.roles.includes('LECTURER')
                                                ? <button onClick={() => handleClickRemove(user.id)} className="btn btn-danger float-right" color="info">
                                                        Remove Lecturer role
                                                    </button>
                                                : <button onClick={() => handleClickAdd(user.id)} className="btn btn-info float-right" color="info">
                                                        Add Lecturer role
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                }
                            </table>
                        </CCardBody>
                    </CCard>
                </CCol>
            )

        }
            {userLoading
                ? <CustomLoader />
                : user && user.roles && user.roles.includes('LECTURER') && <GroupAccess userId={match.params.id} />
            }
        </CRow>

    )
}

export default User
