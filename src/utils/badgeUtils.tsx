import {CBadge} from '@coreui/react';


const getRankBadge = <TObj, TProp extends keyof TObj>(value: any, prop: TProp, data: Array<TObj>): JSX.Element => {
    const rank = data.filter((u: any) => u[prop] >= value).length
    if (rank <= 3) {
        const str = rank === 1 ? '1st' : rank === 2 ? '2nd' : '3rd';
        return (
            <CBadge color="primary">
                {str}
            </CBadge>
        )
    }
    return <></>
};

export const getBadge = <TObj, TProp extends keyof TObj>(item: TObj, prop: TProp, data: Array<TObj>): JSX.Element => (
    <td>
        <span style={{padding: 5}}>
            {item[prop]}
        </span>
        {getRankBadge(item[prop], prop, data)}
    </td>
);
