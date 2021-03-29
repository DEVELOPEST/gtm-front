import {
    Area,
    Bar,
    ComposedChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {useStoreState} from "../../store/store";
import React from "react";
import {dateFormatter} from "../../utils/dateUtils";

const TimelineChart = () => {
    const {data} = useStoreState((state) => state.timeline);


    return (
            <ResponsiveContainer width="100%" height={400} >
                <ComposedChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <defs>
                        <linearGradient id="colorUvRed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="95%" stopColor="#b31414" stopOpacity={0.1}/>
                        </linearGradient>
                    </defs>
                    <Tooltip labelFormatter={(t) => dateFormatter(t) }/>
                    <XAxis
                        padding={{ left: 15, right: 15 }}
                        dataKey="start"
                        tickLine={false}
                        tickFormatter={dateFormatter}
                    />
                    <YAxis
                        yAxisId="left"
                        tickCount={10}
                        tickLine={false}
                        axisLine={false} />
                    <YAxis
                        padding={{ top: 250, bottom: 0 }}
                        yAxisId="right"
                        orientation='right'
                        tickCount={10}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                    />
                    <Bar
                        yAxisId="right"
                        dataKey="users"
                        stroke="#f04037"
                        fill="url(#colorUvRed)" />
                    <Area
                        yAxisId="left"
                        type="monotoneX"
                        dataKey="time"
                        stroke="#0f7dfa"
                        fill="none"
                        strokeWidth={3}
                        animationDuration={300}
                    />
                </ComposedChart>
            </ResponsiveContainer>

    )
}

export default TimelineChart;
