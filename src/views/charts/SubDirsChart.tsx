import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {useStoreState} from "../../store/store";
import React from "react";
import {GRAPH_COLORS} from "../../constants";
import SubDirChartTooltip from "../charts/tooltips/SubDirChartTooltip"
import {dateFormatter} from "../../utils/dateUtils";
import {ISubDirLevelTimelineData} from "../../api/models/ITimeline";

const SubDirsChart = () => {
    const {data, paths} = useStoreState(state => state.subDirsTimeline)
    const getPathData = (data: ISubDirLevelTimelineData, path: string) => {
        if (data.directories.get(path) == null) return 0;
        return data.directories.get(path)!.time;
    };
    const getColor = (i: number) => {
        return GRAPH_COLORS[i % GRAPH_COLORS.length];
    };


    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <Tooltip content={<SubDirChartTooltip/>}/>
                <XAxis dataKey="start"
                    // @ts-ignore TODO: Tavo
                       tickFormatter={dateFormatter}/>
                <YAxis tickCount={10} tickLine={false} axisLine={false}/>
                {
                    paths.map((path, i) => {
                        return (<Area
                            key={path}
                            stackId="1"
                            type="step"
                            name={path}
                            dataKey={(e) => getPathData(e, path)}
                            fill={getColor(i)}
                            stroke={getColor(i)}
                            fillOpacity="0.9"/>)
                    })
                }
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default SubDirsChart;
