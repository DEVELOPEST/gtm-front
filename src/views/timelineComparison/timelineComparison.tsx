import React from "react";
import {
    CCard,
    CCardBody,
} from '@coreui/react'

import TimelineComparisonInputs from '../../reusable/timelineComparisonInputs';
import TimelineComparisonChart from "../charts/TimelineComparisonChart";

const timelineComparison = () => {

    return (
        <>
            <TimelineComparisonInputs />
            <CCard>
                <CCardBody>
                    <h3>Timeline Comparison</h3>
                    <TimelineComparisonChart />
                </CCardBody>
            </CCard>

        </>
    )
}

export default timelineComparison
