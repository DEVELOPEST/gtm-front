import {
    Area,
    Bar,
    CartesianGrid,
    ComposedChart,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {useStoreState} from "easy-peasy";
import React from "react";

const ActivityChart = () => {
    const {data} = useStoreState(state => state.activity_timeline)
    return (
        //     <ResponsiveContainer width="100%" height="100%" >
                <ComposedChart width={1300} height={400} data={data}>
                    <defs>
                        <linearGradient id="colorUvBlue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0f7dfa" stopOpacity={0.7}/>
                            <stop offset="95%" stopColor="#0f7dfa" stopOpacity={0.2}/>
                        </linearGradient>
                        <linearGradient id="colorUvRed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#b31414" stopOpacity={0.5}/>
                            <stop offset="95%" stopColor="#b31414" stopOpacity={0.2}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name"/>
                    <YAxis yAxisId="left" tickCount={10} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="right" orientation='right' tickCount={10} tickLine={false} axisLine={false} allowDecimals={false}/>
                    <Area yAxisId="left" type="monotoneX" dataKey="time" stroke="#0f7dfa" fill="url(#colorUvBlue)"/>
                    <Bar yAxisId="right" type="monotone" dataKey="users" stroke="#f04037" fill="url(#colorUvRed)"/>
                </ComposedChart>
        //     </ResponsiveContainer>

    )
}

export default ActivityChart;
