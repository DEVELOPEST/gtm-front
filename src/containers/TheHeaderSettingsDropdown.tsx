import React from 'react'
import { useHistory } from 'react-router-dom'
import {
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

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
                <CDropdownItem onClick={() =>  history.push(`/profile`)}>
                    <CIcon name="cil-settings" className="mfe-2" />
                    Profile
                </CDropdownItem>
                <CDropdownItem onClick={handleLogOut} >
                    <CIcon name="cil-lock-locked" className="mfe-2" />
                    Log out
                </CDropdownItem>

            </CDropdownMenu>
        </CDropdown>
    )
}

export default TheHeaderSettingsDropdown
