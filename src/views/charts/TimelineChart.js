import {
    Area,
    Bar,
    ComposedChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {useStoreState} from "easy-peasy";
import React from "react";

const TimelineChart = () => {
    const {data} = useStoreState((state) => state.timeline);

    const dateFormatter = (date) => {
        if (typeof date !== 'string' || date.indexOf('T') === -1) return date;
        return date?.split('T')[0];
    };

    return (
            <ResponsiveContainer width="100%" height={400} >
                <ComposedChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
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
                    <Tooltip />
                    <XAxis padding={{ left: 26, right: 26 }} dataKey="start" tickFormatter={dateFormatter}/>
                    <YAxis yAxisId="left" tickCount={10} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="right" orientation='right' tickCount={10} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Area yAxisId="left" type="monotoneX" dataKey="time" stroke="#0f7dfa" fill="url(#colorUvBlue)" />
                    <Bar yAxisId="right" dataKey="users" stroke="#f04037" fill="url(#colorUvRed)" />
                </ComposedChart>
            </ResponsiveContainer>

    )
}

export default TimelineChart;
