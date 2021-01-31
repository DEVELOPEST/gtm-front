import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CPagination,
} from '@coreui/react'

import {useStoreActions, useStoreState} from "easy-peasy";

const Users = () => {
    const {users} = useStoreState(state => state.users)
    const {fetchUsers} = useStoreActions(actions => actions.users)
    const {addRole} = useStoreActions(actions => actions.roles)
    const history = useHistory()
    const itemsPerPage = 10
    const maxPage = users.length % itemsPerPage === 0
        ? users.length / itemsPerPage
        : Math.floor(users.length / itemsPerPage + 1)
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage > maxPage ? maxPage : currentPage)

    const pageChange = newPage => {
        if (newPage > maxPage) {
            newPage = maxPage
        }
        currentPage !== newPage && history.push(`/users?page=${newPage}`)
    }

    const handleClick = async id => {
        await addRole(id)
        window.location.reload()
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {

        currentPage !== page && setPage(currentPage)
    }, [currentPage, page])

    return (
        <CRow>
            <CCol >
                <CCard>
                    <CCardHeader>
                        Users
                    </CCardHeader>
                    <CCardBody>
                        <CDataTable
                            items={users}
                            fields={[
                                { key: 'email', _classes: 'font-weight-bold' },
                                'roles',
                                ''
                            ]}
                            hover
                            striped
                            itemsPerPage={itemsPerPage}
                            activePage={page}
                            scopedSlots = {{
                                '':
                                    (item)=>(
                                        <td>
                                            {item.roles.includes('LECTURER') ? '' :
                                                <button onClick={() => handleClick(item.id)} className="btn btn-info float-right" color="info">Add
                                                    Lecturer role</button>
                                            }
                                        </td>
                                    )
                            }}
                        />
                        {
                            users.length <= itemsPerPage ? ''
                                :<CPagination
                                    activePage={page}
                                    onActivePageChange={pageChange}
                                    pages={maxPage}
                                    doubleArrows={false}
                                    align="center"
                                />
                        }

                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Users
