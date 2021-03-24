import {CBadge} from '@coreui/react';

// TODO: Tavo (value: any, prop: any, data: any)
const getRankBadge = (value: any, prop: any, data: any) => {
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
}

// TODO: Tavo (item: any, prop: any, data: any)
export const getBadge = (item: any, prop: any, data: any) => {
    return (
        <td>
                <span style={{padding: 5}}>
                {item[prop]}
                </span>
            {getRankBadge(item[prop], prop, data)}
        </td>
    )
}
