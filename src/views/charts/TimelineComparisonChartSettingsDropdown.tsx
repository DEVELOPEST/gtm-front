import React, {useEffect} from "react";
import {
    CDropdown,
    CDropdownMenu,
    CDropdownToggle,
    CDropdownItem
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {useStoreActions, useStoreState} from "../../store/store";

const TimelineComparisonChartSettingsDropdown = () => {
    const {settings} = useStoreState((state) => state.timelineComparison);
    const {setSettings} = useStoreActions((actions) => actions.timelineComparison);

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

export default TimelineComparisonChartSettingsDropdown
