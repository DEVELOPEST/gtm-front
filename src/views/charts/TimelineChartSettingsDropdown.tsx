import React, {useEffect} from "react";
import {
    CDropdown,
    CDropdownMenu,
    CDropdownToggle,
    CDropdownItem
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {useStoreActions, useStoreState} from "../../store/store";
import setAuthHeader from "../../utils/setAuthHeader";

const TimelineChartSettingsDropdown = () => {
    const {settings} = useStoreState((state) => state.timeline);
    const {groups, chosenGroup } = useStoreState(state => state.groups)
    const {interval} = useStoreState(state => state.dashboardInputs)

    const {setSettings, fetchTimeline} = useStoreActions((actions) => actions.timeline);

    useEffect(() => {
        if ((chosenGroup !== null || groups.length > 0) && interval !== '') {
            fetchTimeline();
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

export default TimelineChartSettingsDropdown
