import React, {useEffect} from "react";
import {
    CDropdown,
    CDropdownMenu,
    CDropdownToggle,
    CDropdownItem
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {useStoreActions, useStoreState} from "../../store/store";

const SubDirsChartSettingsDropdown = () => {
    const {settings} = useStoreState((state) => state.subDirsTimeline);
    const {groups, chosenGroup } = useStoreState(state => state.groups)
    const {interval} = useStoreState(state => state.dashboardInputs)

    const {setSettings, fetchSubDirsTimeline} = useStoreActions((actions) => actions.subDirsTimeline);

    useEffect(() => {
        if ((chosenGroup !== null || groups.length > 0) && interval !== '') {
            fetchSubDirsTimeline();
        }
    }, [settings])

    return (
        <CDropdown
            className="c-header-nav-item mx-2"
        >
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <CIcon name="cil-settings" alt="Settings" />
            </CDropdownToggle>
            <CDropdownMenu  placement="bottom-end" className="pt-0">
                <CDropdownItem
                    header
                    tag="div"
                    color="light"
                    className="text-center"
                >
                    <strong>Settings</strong>
                </CDropdownItem>
                <CDropdownItem onClick={() => setSettings({...settings, cumulative: !settings.cumulative})} active={settings.cumulative}>
                    Cumulative
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default SubDirsChartSettingsDropdown
