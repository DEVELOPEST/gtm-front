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
            data-testid="the-header-settings-dropdown"
        >
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <CIcon name="cil-user" alt="User" data-testid="user-icon-toggle" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                {hasAnyRole(['ADMIN']) && <>
                <CDropdownItem
                    header
                    tag="div"
                    className="text-center"
                    color="light"
                    data-testid="admin-item"
                >
                    <strong>Admin</strong>
                </CDropdownItem>
                    <CDropdownItem onClick={() =>  history.push(`/users`)} data-testid="user-item">
                        <CIcon name="cil-user" className="mfe-2" data-testid="user-icon" />
                        Users
                    </CDropdownItem>

                </>}
                <CDropdownItem
                    header
                    tag="div"
                    className="text-center"
                    color="light"
                    data-testid="account-item"
                >
                    <strong>Account</strong>
                </CDropdownItem>
                <CDropdownItem onClick={() =>  history.push(`/profile`)} data-testid="profile-item">
                    <CIcon name="cil-settings" className="mfe-2" data-testid="profile-icon" />
                    Profile
                </CDropdownItem>
                <CDropdownItem onClick={handleLogOut} data-testid="logout-item" >
                    <CIcon name="cil-room" className="mfe-2" data-testid="logout-icon" />
                    Log out
                </CDropdownItem>

            </CDropdownMenu>
        </CDropdown>
    )
}

export default TheHeaderSettingsDropdown
