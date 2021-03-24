import React from "react";
import {dateFormatter} from "../../../utils/dateUtils";

// TODO: Tavo (props: any)
const SubDirChartTooltip = (props: any) => {
    const {active, payload} = props;

    if (active && payload != null) {
        const style = {
            padding: 6,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
        };
        // @ts-ignore TODO: Tavo
        const currData = payload.filter((entry) => (entry?.value || 0) !== 0);

        return (
            <div className="area-chart-tooltip" style={style}>
                <p>{dateFormatter(currData[0]?.payload?.start)}</p>
                {
                    // @ts-ignore TODO: Tavo
                    currData.map((entry) => {
                        return <p style={{color: entry?.color}}>{entry?.name + ' : '}<em>{entry?.value}</em></p>
                    })
                }
            </div>
        );
    }
    return null;
};

export default SubDirChartTooltip;
