import React, {useState, useEffect} from 'react'
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
    const history = useHistory()
    const itemsPerPage = 10
    const maxPage = users.length % itemsPerPage === 0
        ? users.length / itemsPerPage
        : Math.floor(users.length / itemsPerPage + 1)
    const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
    const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
    const [page, setPage] = useState(currentPage > maxPage ? maxPage : currentPage)


    const getBadge = status => {
        switch (status) {
            case 'LECTURER': return 'success'
            case 'USER': return 'secondary'
            case 'ADMIN': return 'danger'
            default: return 'primary'
        }
    }

    const pageChange = newPage => {
        if (newPage > maxPage) {
            newPage = maxPage
        }
        currentPage !== newPage && history.push(`/users?page=${newPage}`)
    }

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])


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
                                { key: 'username', _classes: 'font-weight-bold w-50' },
                                { key: 'roles', _classes: 'font-weight-bold w-50' },
                            ]}
                            hover
                            striped
                            itemsPerPage={itemsPerPage}
                            activePage={page}
                            clickableRows
                            onRowClick={(item) => history.push(`/users/${item.id}`)}
                            scopedSlots = {{
                                'roles':
                                    (item)=>(
                                        <td>
                                            {item.roles.map((value) => {
                                                return <CBadge className='mr-2' color={getBadge(value)}>
                                                    {value}
                                                </CBadge>
                                            })}

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
