import React from 'react'
import {Radar} from 'react-chartjs-2'

export default function RadarGraph({Data, searchYear}) {

    const dynamicLabel = () => {
        let Label;
        if(searchYear === 0) Label = 'Annual Gun Crimes in Chicago'
        else Label = `Gun Crimes in Chicago by Month: ${searchYear}`
        return Label
    }

    return (
        <Radar
            data={{
            labels: Object.keys(Data),
            datasets: [
                {
                label: `${dynamicLabel()}`,
                data: Object.values(Data),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'red',
                ],
                borderWidth: 4,
                },
            ],
            }}
            height={400}
            width={600}
            options={{
            maintainAspectRatio: false,
            scales: {
                r: {
                    grid: {
                        color: "rgb(65, 65, 65)"
                    }
                }
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
