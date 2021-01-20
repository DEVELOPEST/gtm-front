import {Bar, CartesianGrid, ComposedChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useStoreState} from "easy-peasy";
import React from "react";

const ExampleChart = () => {
    const {data} = useStoreState(state => state.timeline)
    return (
        //     <ResponsiveContainer width="100%" height="100%" >
                <ComposedChart width={500} height={300} data={data}>
                    <XAxis dataKey="name"/>
                    <YAxis
                    />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="time" stroke="#8884d8" />
                    <Bar type="monotone" dataKey="time" stroke="#8884d8" />
                </ComposedChart>
        //     </ResponsiveContainer>

    )
}

export default ExampleChart;
