import {
    Area, Bar,
    ComposedChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {useStoreState} from "easy-peasy";
import React from "react";

const ActivityChart = () => {
    const {data} = useStoreState(state => state.activityTimeline)
    return (
        <ResponsiveContainer width="100%" height={400} >
                <ComposedChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <defs>
                    </defs>
                    <Tooltip />
                    <XAxis padding={{ left: 15, right: 15 }} dataKey="label" tickLine={false}/>
                    <YAxis yAxisId="left" tickCount={10} tickLine={false} axisLine={false} />
                    <YAxis padding={{ top: 200, bottom: 0 }} yAxisId="right-lines" orientation='right' tickCount={10} tickLine={false} axisLine={false} allowDecimals={false}/>
                    <Area
                        yAxisId="right-lines"
                        type="monotoneX"
                        dataKey="linesRemoved"
                        stroke="#bf0000"
                        fill="#b31414"
                        fillOpacity="0.2"
                        strokeWidth={2}
                        animationDuration={300}/>
                    <Area
                        yAxisId="right-lines"
                        type="monotoneX"
                        dataKey="linesAdded"
                        stroke="#00bf16"
                        fill="#00b000"
                        fillOpacity="0.1"
                        strokeWidth={2}
                        animationDuration={300}/>
                    <Area
                        yAxisId="left"
                        type="monotoneX"
                        dataKey="time"
                        stroke="#0f7dfa"
                        fill="none"
                        strokeWidth={3}
                        animationDuration={300}/>
                </ComposedChart>
        </ResponsiveContainer>

    )
}

export default ActivityChart;
