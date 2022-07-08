import React from 'react'
import {Line} from 'react-chartjs-2'

export default function LineGraph({Data, searchYear}) {

    const dynamicLabel = () => {
        let Label;
        if(searchYear === 0) Label = 'Annual Gun Crimes in Chicago'
        else Label = `Gun Crimes in Chicago by Month: ${searchYear}`
        return Label
    }

    return (
        <Line
            data={{
            labels: Object.keys(Data),
            datasets: [
                {
                label: `${dynamicLabel()}`,
                data: Object.values(Data),
                borderColor: [
                    'rgba(255,0,0, 1)',
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
                y: {
                    grid: {
                        drawTicks: false,
                        color: "rgb(65, 65, 65)"
                    }
                },
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
