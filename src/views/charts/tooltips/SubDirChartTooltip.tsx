import React from "react";
import {dateFormatter} from "../../../utils/dateUtils";
import {TooltipProps} from "recharts";
import {NameType, ValueType} from "recharts/types/component/DefaultTooltipContent";

const SubDirChartTooltip = (props: TooltipProps<any, NameType>) => {
    const {active, payload} = props;

    if (active && payload != null) {
        const style = {
            padding: 6,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
        };
        const currData = payload.filter((entry) => (entry?.value || 0) !== 0);
        return (
            <div className="area-chart-tooltip" style={style}>
                <p>{dateFormatter(currData[0]?.value?.start)}</p>
                {
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
