import React from "react";
import {
    CCard,
    CCardBody,
} from '@coreui/react'

import TimelineComparisonInputs from '../../reusable/timelineComparisonInputs';
import TimelineComparisonChart from "../charts/TimelineComparisonChart";
import TimelineComparisonChartSettingsDropdown from "../charts/TimelineComparisonChartSettingsDropdown";

const timelineComparison = () => {

    return (
        <>
            <TimelineComparisonInputs />
            <CCard>
                <CCardBody>
                    <div className="row">
                        <div className="col-11">
                            <h3>Timeline Comparison</h3>
                        </div>
                        <div className="col-1">
                            <TimelineComparisonChartSettingsDropdown />
                        </div>
                    </div>
                    <TimelineComparisonChart />
                </CCardBody>
            </CCard>

        </>
    )
}

export default timelineComparison
