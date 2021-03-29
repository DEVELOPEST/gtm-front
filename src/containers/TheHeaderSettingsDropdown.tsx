import React from 'react'
import { useHistory } from 'react-router-dom'
import {
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle, CHeaderNavItem, CHeaderNavLink,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {hasAnyRole} from "../Auth";

const TheHeaderSettingsDropdown = () => {
    const history = useHistory()

    const handleLogOut = () => {
        localStorage.removeItem('token');
        document.cookie="jwt=; Max-Age=0; Path=/;";
        window.location.reload();
    }

    return (
        <CDropdown
            inNav
            className="c-header-nav-items mx-2"
        >
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <CIcon name="cil-user" alt="User" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                {hasAnyRole(['ADMIN']) && <>
                <CDropdownItem
                    header
                    tag="div"
                    className="text-center"
                    color="light"
                >
                    <strong>Admin</strong>
                </CDropdownItem>
                    <CDropdownItem onClick={() =>  history.push(`/users`)}>
                        <CIcon name="cil-user" className="mfe-2" />
                        Users
                    </CDropdownItem>

                </>}
                <CDropdownItem
                    header
                    tag="div"
                    className="text-center"
                    color="light"
                >
                    <strong>Account</strong>
                </CDropdownItem>
                <CDropdownItem onClick={() =>  history.push(`/profile`)}>
                    <CIcon name="cil-settings" className="mfe-2" />
                    Profile
                </CDropdownItem>
                <CDropdownItem onClick={handleLogOut} >
                    <CIcon name="cil-room" className="mfe-2" />
                    Log out
                </CDropdownItem>

            </CDropdownMenu>
        </CDropdown>
    )
}

export default TheHeaderSettingsDropdown
