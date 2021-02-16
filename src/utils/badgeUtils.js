import {CBadge} from '@coreui/react';

const getRankBadge = (value, prop, data) => {
    const rank = data.filter((u) => u[prop] >= value).length
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

export const getBadge = (item, prop, data) => {
    return (
        <td>
                <span style={{padding: 5}}>
                {item[prop]}
                </span>
            {getRankBadge(item[prop], prop, data)}
        </td>
    )
}
