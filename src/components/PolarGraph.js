import React from 'react'
import {PolarArea} from 'react-chartjs-2'

export default function PolarGraph({Data, searchYear}) {

    const dynamicLabel = () => {
        let Label;
        if(searchYear === 0) Label = 'Annual Gun Crimes in Chicago'
        else Label = `Gun Crimes in Chicago by Month: ${searchYear}`
        return Label
    }

    return (
        <PolarArea
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
                borderColor: [
                    'rgba(255,0,0, 1)',
                    'rgba(0,255,0, 1)',
                    'rgba(0,0,255, 1)',
                    'rgba(0,255,255, 1)',
                    'rgba(255,0,255, 1)',
                    'rgba(192,192,192, 1)',
                    'rgba(128,128,128, 1)',
                    'rgba(128,0,0, 1)',
                    'rgba(128,128,0, 1)',
                    'rgba(0,40,70, 1)',
                    'rgba(128,0,128, 1)',
                    'rgba(0,128,128, 1)',
                    'rgba(0,0,128, 1)',
                    'rgba(255,127,80, 1)',
                    'rgba(95,50,130, 1)',
                    'rgba(184,134,11, 1)',
                    'rgba(34,139,34, 1)',
                    'rgba(0,128,128, 1)',
                    'rgba(255,105,180, 1)',
                    'rgba(245,222,179, 1)',
                    'rgba(139,69,19, 1)',
                    'rgba(188,143,143, 1)',
                    'rgba(112,128,144, 1)',
                    'rgba(240,255,240, 1)',
                ],
                borderWidth: 1,
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
