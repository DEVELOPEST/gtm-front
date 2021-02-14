import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {useStoreState} from "easy-peasy";
import React from "react";
import {GRAPH_COLORS} from "../../constants";

const SubDirsChart = () => {
    const {data, paths} = useStoreState(state => state.subDirsTimeline)
    const getPathData = (data, path) => {
        if (data.directories[path] == null) return 0;
        return data.directories[path].time;
    };
    const getColor = (i) => {
        return GRAPH_COLORS[i % GRAPH_COLORS.length];
    };

    const dateFormatter = (date) => {
        if (typeof date !== 'string' || date.indexOf('T') === -1) return date;
        return date?.split('T')[0];
    };

    // TODO: Move to some other file...
    const CustomTooltip = (props) => {
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
                    <p>{dateFormatter(currData[0]?.payload?.start)}</p>
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

    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <Tooltip content={<CustomTooltip/>}/>
                <XAxis dataKey="start" tickFormatter={dateFormatter}/>
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
