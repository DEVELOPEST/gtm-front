import React, {useEffect} from 'react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import {useStoreActions, useStoreState} from "easy-peasy";

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

const MainChart = attributes => {
  const {timeData, labelsData, usersData} = useStoreState(state => state.timeline)
  const {chosenInterval} = useStoreState(state => state.intervals)
  const {fetchTimeline} = useStoreActions(actions => actions.timeline)

  const defaultDatasets = (()=>{
    return [
      {
        label: 'Hours',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: timeData
      },
      {
        label: 'Users',
        // backgroundColor: hexToRgba(brandDanger, 10),
        borderColor: brandDanger,
        backgroundColor: 'transparent',
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 2,
        data: usersData
      }

    ]
  })()

  const defaultOptions = (()=>{
    return {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,

            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  )()

  // render
  return (
      <CChartLine
          {...attributes}
          datasets={defaultDatasets}
          options={defaultOptions}
          labels={labelsData.map(item => item)}
      />
  )
}


export default MainChart
