import React from 'react'
import {Doughnut} from 'react-chartjs-2'

export default function DonutGraph({Data, searchYear}) {

    const dynamicLabel = () => {
        let Label;
        if(searchYear === 0) Label = 'Annual Gun Crimes in Chicago'
        else Label = `Gun Crimes in Chicago by Month: ${searchYear}`
        return Label
    }

    return (
        <Doughnut
            data={{
            labels: Object.keys(Data),
            datasets: [
                {
                label: `${dynamicLabel()}`,
                data: Object.values(Data),
                backgroundColor: [
                    'rgba(255,0,0, 0.5)',
                    'rgba(0,255,0, 0.5)',
                    'rgba(0,0,255, 0.5)',
                    'rgba(0,255,255, 0.5)',
                    'rgba(255,0,255, 0.5)',
                    'rgba(192,192,192, 0.5)',
                    'rgba(128,128,128, 0.5)',
                    'rgba(128,0,0, 0.5)',
                    'rgba(128,128,0, 0.5)',
                    'rgba(0,40,70, 0.5)',
                    'rgba(128,0,128, 0.5)',
                    'rgba(0,128,128, 0.5)',
                    'rgba(0,0,128, 0.5)',
                    'rgba(255,127,80, 0.5)',
                    'rgba(95,50,130, 0.5)',
                    'rgba(184,134,11, 0.5)',
                    'rgba(34,139,34, 0.5)',
                    'rgba(0,128,128, 0.5)',
                    'rgba(255,105,180, 0.5)',
                    'rgba(245,222,179, 0.5)',
                    'rgba(139,69,19, 0.5)',
                    'rgba(188,143,143, 0.5)',
                    'rgba(112,128,144, 0.5)',
                    'rgba(240,255,240, 0.5)',
                ],
                },
            ],
            }}
            height={400}
            width={600}
            options={{
            maintainAspectRatio: false,
            scales: {
            },
            legend: {
                labels: {
                fontSize: 25,
                },
            },
            }}
        />
    )
}
