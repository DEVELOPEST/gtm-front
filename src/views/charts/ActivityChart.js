import {
    Area,
    Bar,
    ComposedChart, ResponsiveContainer,
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
                        <linearGradient id="colorUvBlue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0f7dfa" stopOpacity={0.7}/>
                            <stop offset="95%" stopColor="#0f7dfa" stopOpacity={0.0}/>
                        </linearGradient>
                        <linearGradient id="colorUvRed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#b31414" stopOpacity={0.7}/>
                            <stop offset="95%" stopColor="#b31414" stopOpacity={0.0}/>
                        </linearGradient>
                        <linearGradient id="colorUvGreen" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00b000" stopOpacity={0.6}/>
                            <stop offset="95%" stopColor="#00b000" stopOpacity={0.0}/>
                        </linearGradient>
                    </defs>
                    <Tooltip />
                    <XAxis dataKey="label"/>
                    <YAxis yAxisId="left" tickCount={10} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="right-lines" orientation='right' tickCount={10} tickLine={false} axisLine={false} allowDecimals={false}/>
                    <Area yAxisId="left" type="monotoneX" dataKey="time" stroke="#0f7dfa" fill="url(#colorUvBlue)"/>
                    <Area yAxisId="right-lines" type="monotoneX" dataKey="linesAdded" stroke="#00bf16" fill="url(#colorUvGreen)"/>
                    <Area yAxisId="right-lines" type="monotoneX" dataKey="linesRemoved" stroke="#bf0000" fill="url(#colorUvRed)"/>
                </ComposedChart>
        </ResponsiveContainer>

    )
}

export default ActivityChart;