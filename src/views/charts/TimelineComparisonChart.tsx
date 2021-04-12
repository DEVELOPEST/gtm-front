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
import React, {useEffect, useState} from "react";
import {dateFormatter} from "../../utils/dateUtils";
import {GRAPH_COLORS} from "../../constants";

const TimelineComparisonChart = () => {
    const [dataKeys, setDataKeys] = useState<string[]>([])
    const [chartData, setChartData] = useState<{}[]>([])
    const {data} = useStoreState((state) => state.timelineComparison);
    const getColor = (i: number) => {
        return GRAPH_COLORS[i % GRAPH_COLORS.length];
    };
    const mapData = () => {
        setDataKeys(data.map((obj) => {
            return obj.groupName
        }))

        if (data && data.length && data[0].timeline && data[0].timeline.length ) {
            const timelineLength = data[0].timeline.length
            let chartObjects = []
            for (let i = 0; i < timelineLength; i++) {
                let chartObject = {}
                data.forEach((data) => {
                    // @ts-ignore
                    chartObject[data.groupName] = data.timeline[i].time
                    // @ts-ignore
                    chartObject.start = data.timeline[i].start
                })
                chartObjects.push(chartObject)
            }

            setChartData(chartObjects)
        }
    }

    useEffect(() => {
        mapData();
    }, [data]);

    return (
        <ResponsiveContainer width="100%" height={400} >

            <ComposedChart data={chartData} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
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
                {
                    dataKeys.map((str, i) => {
                        return  <Area
                            key={str}
                                    yAxisId="left"
                                    type="monotoneX"
                                    dataKey={str}
                                    stroke={getColor(i)}
                                    fill="none"
                                    strokeWidth={2}
                                    animationDuration={300}
                                />
                    })
                }
            </ComposedChart>
        </ResponsiveContainer>

    )
}

export default TimelineComparisonChart;
